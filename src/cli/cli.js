const colors = require(`colors`);
const author = require(`./author`);
const description = require(`./description`);
const license = require(`./license`);
const version = require(`./version`);
const empty = require(`./empty`);
const help = require(`./help`);
const server = require(`./server`);

const list = [
  author,
  description,
  license,
  empty,
  server,
  version
];
list.push(help(list));

const args = process.argv.slice(2);

const index = list.findIndex((value) => value.condition(args[0]));

if (list[index]) {
  list[index].execute(args.slice(1));
} else {
  console.error(`${colors.red(`To list possible options use`)} ${colors.green(help.name)}`);
  process.exitCode = 1;
}
