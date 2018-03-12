module.exports = class NotFoundError extends Error {
  constructor(reason) {
    super();
    this.code = 404;
    this.message = `Not Found`;
    this.errorMessage = reason;
  }
};
