module.exports = class NotFoundError extends Error {
  constructor(error = `Not found`) {
    super();

    this.statusCode = 404;
    this.error = error;
  }
};
