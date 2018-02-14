const packageInfo = require(`../../package.json`);

module.exports = {
  name: `license`,
  description: `Shows program license`,
  predicate(arg) {
    return arg === `--${this.name}`;
  },
  execute() {
    console.log(`license ${packageInfo.license}`);
  }
};
