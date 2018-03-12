const colors = require(`colors`);
const packageInfo = require(`../../../package.json`);
const paramsUtils = require(`../utils/params-utils`);

module.exports = {
  name: `--author`,
  description: `Shows program author`,
  condition(param) {
    return paramsUtils.defaultCondition(this.name, param);
  },
  execute() {
    console.log(`${colors.grey(`It was developed by`)} ${colors.green(packageInfo.author)}`);
  }
};
