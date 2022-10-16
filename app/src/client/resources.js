import { reverse } from "./constants";
import {
  UserModel,
  AdSpacesModel,
  AdSpaceModel,
  AdSpaceImageModel,
} from "./models";
import {
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from "./constants";
import { BadRequestError, RegisterError } from "./errors";

class Resource {
  constructor(instance) {
    this._instance = instance;
  }
}

export class Authentication extends Resource {
  async user() {
    const response = await this._instance.get(reverse("user"));

    return new UserModel(response.data);
  }

  async login({ email, password }) {
    const response = await this._instance.post(reverse("login"), {
      email,
      password,
    });

    setAccessToken(response.data.access_token);
    setRefreshToken(response.data.refresh_token);
  }

  logout() {
    removeAccessToken();
    removeRefreshToken();
  }

  async register({ email, username, password }) {
    try {
      await this._instance.post(reverse("register"), {
        email,
        username,
        password,
      });
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new RegisterError(error.data);
      }

      throw error;
    }
  }

  async update({ contactEmail, contactPhone, contactMessenger }) {
    await this._instance.patch(reverse("user"), {
      contact_email: contactEmail,
      contact_phone: contactPhone,
      contact_messenger: contactMessenger,
    });
  }
}

export class AdSpaces extends Resource {
  async list({ user, tag } = { user: undefined, tag: undefined }) {
    const response = await this._instance.get(reverse("adspaceList"), {
      params: { ...(user !== undefined && { user }), ...(tag !== undefined && { tag }) },
    });
    return new AdSpacesModel(response.data);
  }

  async retrieve(id) {
    const response = await this._instance.get(reverse("adspaceDetail", { id }));
    return new AdSpaceModel(response.data);
  }

  async create(data = {}) {
    const {
      title,
      price,
      location = "",
      description,
      tags,
      images,
      latitude,
      longitude,
    } = data;

    await this._instance.post(reverse("adspaceList"), {
      title,
      price,
      location,
      latitude: latitude ? latitude.toString().slice(0, 9) : null,
      longitude: longitude ? longitude.toString().slice(0, 9) : null,
      description,
      tags,
      // Convert array of data strings to array of objects
      images: images.map((image) => ({
        image,
      })),
    });
  }

  async update(data = {}) {
    const {
      id,
      title,
      price,
      location,
      description,
      tags,
      latitude,
      longitude,
    } = data;

    await this._instance.patch(reverse("adspaceDetail", { id }), {
      title,
      price,
      location,
      description,
      tags,
      latitude: latitude ? latitude.toString().slice(0, 9) : null,
      longitude: longitude ? longitude.toString().slice(0, 9) : null,
    });
  }

  async destroy(id) {
    await this._instance.delete(reverse("adspaceDetail", { id }));
  }
}

export class Images extends Resource {
  async destroy(id) {
    this._instance.delete(reverse("imageDetail", { id }));
  }

  async create({ adspace, image }) {
    const response = await this._instance.post(reverse("imageList"), {
      space: adspace,
      image,
    });

    return new AdSpaceImageModel(response.data);
  }
}
