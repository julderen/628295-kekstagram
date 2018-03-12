class ValidationError extends Error {
  constructor(errors) {
    super();

    this.statusCode = 400;
    this.error = errors;
  }
}

module.exports = ValidationError;
