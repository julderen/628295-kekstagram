const packageInfo = require(`../../package.json`);

module.exports = {
  name: `version`,
  description: `Shows program version`,
  predicate(arg) {
    return arg === `--${this.name}`;
  },
  execute() {
    console.log(`v${packageInfo.version}`);
  }
};
