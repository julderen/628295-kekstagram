const logger = require(`../logger`);
const {renderDataError} = require(`../utils/data-render-utils`);
const NotFoundError = require(`../errors/not-found-error`);
const ValidationError = require(`../errors/validation-error`);
const BadRequestError = require(`../errors/bad-request-error`);
const InternalServerError = require(`../errors/internal-server-error`);

const EXPECTED_ERRORS = [ValidationError, NotFoundError, BadRequestError];

const errorsHandler = (error, req, res, _next) => {
  const resultError = EXPECTED_ERRORS.some((e) => error instanceof e) ? error : new InternalServerError();

  logger.error(resultError);

  res.status(resultError.statusCode);

  renderDataError(req, res, Array.isArray(resultError.error) ? resultError.error : [resultError.error]);
};

module.exports = errorsHandler;
