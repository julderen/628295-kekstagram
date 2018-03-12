class BadRequestError extends Error {
  constructor(error = `Bad request error`) {
    super();

    this.statusCode = 400;
    this.error = error;
  }
}

module.exports = BadRequestError;
