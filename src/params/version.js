const colors = require(`colors`);
const packageInfo = require(`../../package.json`);

const versionNumber = packageInfo.version.split(`.`);
const versionColors = [`red`, `green`, `grey`];

module.exports = {
  name: `--version`,
  description: `Shows program version`,
  predicate(arg) {
    return arg === this.name;
  },
  execute() {
    console.log(`v${versionNumber.map((value, index) => colors[versionColors[index]](value)).join(`.`)}`);
  }
};
