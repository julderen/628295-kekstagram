const colors = require(`colors`);
const packageInfo = require(`../../package.json`);
const paramsUtils = require(`../utils/paramsUtils`);

module.exports = {
  name: `--license`,
  description: `Shows program license`,
  condition(param) {
    return paramsUtils.defaultCondition(this.name, param);
  },
  execute() {
    console.log(`${colors.grey(`license`)} ${colors.green(packageInfo.license)}`);
  }
};
