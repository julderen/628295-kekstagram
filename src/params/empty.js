const colors = require(`colors`);
const packageInfo = require(`../../package`);
const help = require(`./help`);

module.exports = {
  name: ``,
  description: `Empty params in the program. Show params to help.`,
  predicate(arg) {
    return !arg;
  },
  execute() {
    console.log(`${colors.grey(`This app doesn't do anything.
It was developed by`)} ${colors.green(packageInfo.author)}
${colors.grey(`To list possible options use`)} ${colors.green(help.name)}`);
  }
};
