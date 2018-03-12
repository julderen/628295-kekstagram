class InternalServerError extends Error {
  constructor() {
    super();

    this.statusCode = 500;
    this.error = `Internal Error`;
  }
}

module.exports = InternalServerError;
