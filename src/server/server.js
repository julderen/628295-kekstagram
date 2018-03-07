const express = require(`express`);
const configs = require(`./configs/configs`);
const routes = require(`./routes/routes`);

const app = express();
routes.init(app);

module.exports = {
  start(port = configs.port, hostname = configs.hostname) {
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  },
  app
};
