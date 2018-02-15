const colors = require(`colors`);
const packageInfo = require(`../../package.json`);

module.exports = {
  name: `--license`,
  description: `Shows program license`,
  predicate(arg) {
    return arg === this.name;
  },
  execute() {
    console.log(`${colors.grey(`license`)} ${colors.green(packageInfo.license)}`);
  }
};
