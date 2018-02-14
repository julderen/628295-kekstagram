const packageInfo = require(`../../package.json`);

module.exports = {
  name: `author`,
  description: `Shows program author`,
  predicate(arg) {
    return arg === `--${this.name}`;
  },
  execute() {
    console.log(`It was developed by ${packageInfo.author}`);
  }
};
