const colors = require(`colors`);

const packageInfo = require(`../../package.json`);
const paramsUtils = require(`../utils/paramsUtils`);

const versionNumber = packageInfo.version.split(`.`);
const versionColors = [`red`, `green`, `grey`];

module.exports = {
  name: `--version`,
  description: `Shows program version`,
  condition(param) {
    paramsUtils.defaultCondition(this.name, param);
  },
  execute() {
    console.log(`v${versionNumber.map((value, index) => colors[versionColors[index]](value)).join(`.`)}`);
  }
};
