const colors = require(`colors`);
const packageInfo = require(`../../package.json`);

module.exports = {
  name: `--author`,
  description: `Shows program author`,
  predicate(arg) {
    return arg === this.name;
  },
  execute() {
    console.log(`${colors.grey(`It was developed by`)} ${colors.green(packageInfo.author)}`);
  }
};
