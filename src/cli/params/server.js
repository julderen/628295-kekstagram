const paramsUtils = require(`../utils/paramsUtils`);
const server = require(`../../server/server`);

module.exports = {
  name: `--server`,
  description: `Start server`,
  condition(param) {
    return paramsUtils.defaultCondition(this.name, param);
  },
  execute([port]) {
    server.start(port);
  }
};
