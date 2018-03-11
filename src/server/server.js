const express = require(`express`);
const configs = require(`./configs/configs`);
const routes = require(`./routes/routes`);

const app = express();
routes.init(app);

module.exports = {
  start(
      port = parseInt(process.env.SERVER_PORT, 10) || configs.port,
      hostname = process.env.SERVER_HOST || configs.hostname
  ) {
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  },
  app
};
