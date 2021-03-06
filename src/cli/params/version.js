const colors = require(`colors`);
const packageInfo = require(`../../../package.json`);
const paramsUtils = require(`../utils/params-utils`);

const versionNumber = packageInfo.version.split(`.`);
const versionColors = [`red`, `green`, `grey`];

module.exports = {
  name: `--version`,
  description: `Shows program version`,
  condition(param) {
    return paramsUtils.defaultCondition(this.name, param);
  },
  execute() {
    console.log(`v${versionNumber.map((value, index) => colors[versionColors[index]](value)).join(`.`)}`);
  }
};
