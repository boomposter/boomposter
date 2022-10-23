// Token storage service
//
const ACCESS_TOKEN_KEY_NAME = "accessToken";
const REFRESH_TOKEN_KEY_NAME = "refreshToken";

export function setAccessToken(value) {
  localStorage.setItem(ACCESS_TOKEN_KEY_NAME, value);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY_NAME);
}

export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY_NAME);
}

export function setRefreshToken(value) {
  return localStorage.setItem(REFRESH_TOKEN_KEY_NAME, value);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
}

export function removeRefreshToken() {
  localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
}

// Urls
//
const API_BASE_URL = "/api/";

const urls = {
  // Authentication, registration, account management
  login: () => `auth/login/`,
  register: () => `auth/register/`,
  user: () => `auth/user/`,
  refreshToken: () => `auth/token/refresh/`,
  // Advertisement spaces
  adspaceList: () => `adspaces/`,
  adspaceDetail: ({ id }) => `adspaces/${id}/`,
  // Adspaces images
  imageList: () => `images/`,
  imageDetail: ({ id }) => `images/${id}/`,
};

export function reverse(urlName, args) {
  const url = urls[urlName](args);
  return API_BASE_URL + url;
}
