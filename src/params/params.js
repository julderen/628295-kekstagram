const colors = require(`colors`);
const author = require(`./author`);
const description = require(`./description`);
const license = require(`./license`);
const version = require(`./version`);
const empty = require(`./empty`);
const help = require(`./help`);

const list = [
  author,
  description,
  license,
  empty,
  version
];
list.push(help(list));

module.exports = {
  list,
  checkParam(arg) {
    const index = list.findIndex((value) => value.condition(arg));

    if (this.list[index]) {
      this.list[index].execute();
    } else {
      console.error(`${colors.red(`To list possible options use`)} ${colors.green(help.name)}`);
      process.exitCode = 1;
    }

  }
};
