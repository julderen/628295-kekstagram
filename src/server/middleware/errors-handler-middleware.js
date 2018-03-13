const logger = require(`../logger`);
const {renderDataError} = require(`../utils/data-render-utils`);
const NotFoundError = require(`../errors/not-found-error`);
const ValidationError = require(`../errors/validation-error`);
const BadRequestError = require(`../errors/bad-request-error`);
const InternalServerError = require(`../errors/internal-server-error`);

const EXPECTED_ERRORS = [ValidationError, NotFoundError, BadRequestError];

const errorsHandler = (error, req, res, next) => {
  const resultError = EXPECTED_ERRORS.some((e) => error instanceof e) ? error : new InternalServerError();

  logger.error(error);

  res.status(resultError.statusCode);

  renderDataError(req, res, resultError.errors);
  next();
};

module.exports = errorsHandler;
