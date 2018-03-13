module.exports = class NotFoundError extends Error {
  constructor(errorMessage = `Server does not have requested data`) {
    super();

    this.statusCode = 404;
    this.errors = [{error: `Not found error`, errorMessage}];
  }
};
