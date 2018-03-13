class BadRequestError extends Error {
  constructor(error = `Bad request error`, errorMessage = `You probably sent invalid data`) {
    super();

    this.statusCode = 400;
    this.errors = [{error, errorMessage}];
  }
}

module.exports = BadRequestError;
