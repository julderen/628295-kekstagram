const colors = require(`colors`);
const packageInfo = require(`../../package.json`);

const versionNumber = packageInfo.version.split(`.`);

module.exports = {
  name: `--version`,
  description: `Shows program version`,
  predicate(arg) {
    return arg === this.name;
  },
  execute() {
    console.log(`v${colors.red(versionNumber[0])}.${colors.green(versionNumber[1])}.${colors.grey(versionNumber[2])}`);
  }
};
