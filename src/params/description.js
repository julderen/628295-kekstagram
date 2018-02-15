const colors = require(`colors`);
const packageInfo = require(`../../package.json`);

module.exports = {
  name: `--description`,
  description: `Shows program description`,
  predicate(arg) {
    return arg === this.name;
  },
  execute() {
    console.log(colors.green(packageInfo.description));
  }
};

