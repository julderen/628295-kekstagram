const packageInfo = require(`../../package`);
const help = require(`./help-param`);

module.exports = {
  name: `empty`,
  description: `Empty params in the program. Show params to help.`,
  predicate(arg) {
    return !arg;
  },
  execute() {
    console.log(`This app doesn't do anything.
It was developed by ${packageInfo.author}
To list possible options use --'${help.name}'`);
  }
};
