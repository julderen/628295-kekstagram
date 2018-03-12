const util = require(`util`);
const {MongoError} = require(`mongodb`);
const ValidationError = require(`../errors/validation-error`);

const SUCCESS_CODE = 200;
const BAD_DATA_CODE = 400;

const htmlTemplate = (success, data, backUrl) => (`
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>${success ? `Успех` : `Ошибка в отправленной форме`}</title>
</head>
<body>
<h1>${success ? `Данные формы получены успешно:` : `Отправленная форма неверна:`}</h1>
<pre>
${util.inspect(data)}
</pre>
<a href="${backUrl}">Назад</a>
</body>
</html>`
);

const render = (req, res, data, success) => {
  const badStatusCode = data.code ? data.code : BAD_DATA_CODE;
  res.status(success ? SUCCESS_CODE : badStatusCode);
  switch (req.accepts([`json`, `html`])) {
    case `html`:
      res.set(`Content-Type`, `text/html`);
      const referer = req.header(`Referer`);
      res.send(htmlTemplate(success, data, referer));
      break;
    default:
      res.json(data);
  }
};

module.exports = {
  renderDataSuccess: (req, res, data) => render(req, res, data, true),
  renderDataError: (req, res, data) => render(req, res, data, false),
  renderException: (req, res, exception) => {
    let data = exception;
    if (exception instanceof ValidationError) {
      data = exception.errors;
    } else if (exception instanceof MongoError) {
      data = {};
      switch (exception.code) {
        case 11000:
          data.code = 400;
          data.errorMessage = `Дубликат существущего персонажа`;
          break;
        default:
          data.code = 501;
          data.errorMessage = exception.message;
      }
    }
    render(req, res, data, false);
  }
};
