const express = require(`express`);
const configs = require(`./configs/configs`);
const routes = require(`./routes/routes`);
const logger = require(`./logger`);

const app = express();
routes.init(app);

app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

module.exports = {
  start(
      port = parseInt(process.env.SERVER_PORT, 10) || configs.port,
      hostname = process.env.SERVER_HOST || configs.hostname
  ) {
    app.listen(port, hostname, () => {
      logger.info(`Server running at http://${hostname}:${port}/`);
    });
  },
  app
};
