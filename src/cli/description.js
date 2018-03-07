const colors = require(`colors`);
const packageInfo = require(`../../package.json`);
const paramsUtils = require(`../utils/paramsUtils`);

module.exports = {
  name: `--description`,
  description: `Shows program description`,
  condition(param) {
    return paramsUtils.defaultCondition(this.name, param);
  },
  execute() {
    console.log(colors.green(packageInfo.description));
  }
};

