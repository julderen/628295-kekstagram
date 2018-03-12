const paramsUtils = require(`../utils/params-utils`);
const server = require(`../../server/server`);

module.exports = {
  name: `--server`,
  description: `Start server`,
  condition(param) {
    return paramsUtils.defaultCondition(this.name, param);
  },
  execute(port) {
    return server.start(port);
  }
};
