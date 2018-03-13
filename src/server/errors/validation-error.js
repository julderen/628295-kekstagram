class ValidationError extends Error {
  constructor(errors) {
    super();

    this.statusCode = 400;
    this.errors = errors.map((error) => Object.assign(error, {error: `Validation Error`}));
  }
}

module.exports = ValidationError;
