class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    // Contact information
    this.contactPhone = data.contact_phone;
    this.contactEmail = data.contact_email;
    this.contactMessenger = data.contact_messenger;
  }
}

class AdSpaceImage {
  constructor(data) {
    this.id = data.id;
    this.image = data.image;
    this.adspace = data.space;
  }
}

class AdSpace {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.price = data.price;
    this.location = data.location;
    this.latitude = parseFloat(data.latitude) || null;
    this.longitude = parseFloat(data.longitude) || null;
    this.description = data.description;
    this.created = new Date(data.created);
    this.user = new User(data.user);
    this.tags = data.tags; // array of strings
    this.images = data.images.map((image) => new AdSpaceImage(image));
  }
}

class PaginatedList {
  constructor(data) {
    this.count = data.count;
    this.next = data.next;
    this.previous = data.previous;
    this.results = data.results;
  }
}

class AdSpaces extends PaginatedList {
  constructor(data) {
    super(data);
    this.results = data.results.map((result) => new AdSpace(result));
  }
}

export {
  User as UserModel,
  AdSpace as AdSpaceModel,
  AdSpaces as AdSpacesModel,
  AdSpaceImage as AdSpaceImageModel,
};
