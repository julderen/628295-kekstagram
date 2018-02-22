const colors = require(`colors`);
const author = require(`./author`);
const description = require(`./description`);
const license = require(`./license`);
const version = require(`./version`);
const empty = require(`./empty`);
const help = require(`./help`);

module.exports = {
  list: [
    author,
    description,
    license,
    help,
    empty,
    version
  ],
  checkParam(arg) {
    const index = this.list.findIndex((value) => value.condition(arg));

    if (this.list[index]) {
      this.list[index].execute();
    } else {
      console.error(`${colors.red(`To list possible options use`)} ${colors.green(help.name)}`);
      process.exitCode = 1;
    }

  }
};
