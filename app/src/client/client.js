import axios from "axios";
import { Authentication, AdSpaces, Images } from "./resources";
import {
  reverse,
  getAccessToken,
  removeAccessToken,
  setAccessToken,
  getRefreshToken,
  removeRefreshToken,
} from "./constants";
import {
  NotAuthenticatedError,
  BadRequestError,
  NotFoundError,
} from "./errors";

export default class ApiClient {
  constructor() {
    const instance = axios.create();
    instance.interceptors.request.use(_requestInterceptor, null);
    instance.interceptors.response.use(null, _responseRejectedInterceptor);

    this.authentication = new Authentication(instance);
    this.adspaces = new AdSpaces(instance);
    this.images = new Images(instance);
  }
}

function _requestInterceptor(config) {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return config;
  }

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
}

async function _responseRejectedInterceptor(error) {
  if (error.request) {
    if (error.response.status === 401) {
      removeAccessToken();

      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await axios.post(reverse("refreshToken"), {
            refresh: refreshToken,
          });
          const accessToken = response.data.access;

          setAccessToken(accessToken);
          return axios(_requestInterceptor(error.config));
        } catch (error) {
          if (error.request && error.response.status === 401) {
            removeRefreshToken();
            return Promise.reject(new NotAuthenticatedError());
          }
        }
      }

      return Promise.reject(new NotAuthenticatedError());
    }

    if (error.response.status === 400) {
      throw new BadRequestError(error.response.data);
    }

    if (error.response.status === 404) {
      throw new NotFoundError();
    }
  }

  return Promise.reject(error);
}
