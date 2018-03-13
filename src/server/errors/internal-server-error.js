class InternalServerError extends Error {
  constructor() {
    super();

    this.statusCode = 500;
    this.errors = [{
      error: `Internal Error`,
      errorMessage: `Server has fallen into unrecoverable problem.`
    }];
  }
}

module.exports = InternalServerError;
