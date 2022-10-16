export class NotAuthenticatedError extends Error {}

export class BadRequestError extends Error {
  constructor(data) {
    super();
    this.data = data;
  }
}
export class NotFoundError extends Error {}

export class RegisterError extends BadRequestError {
  constructor(data) {
    super(data);

    this.username = data.username || [];
    this.email = data.email || [];
    this.password = data.password || [];
    this.nonFieldErrors = data.non_field_errors || [];
  }
}
