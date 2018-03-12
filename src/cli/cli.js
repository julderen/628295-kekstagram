const colors = require(`colors`);
const author = require(`./params/author`);
const description = require(`./params/description`);
const license = require(`./params/license`);
const version = require(`./params/version`);
const empty = require(`./params/empty`);
const help = require(`./params/help`);
const server = require(`./params/server`);

const list = [
  author,
  description,
  license,
  empty,
  server,
  version
];
list.push(help(list));

const executeParam = async (param, arg) => {
  await param.execute(arg[1]);

  if (!server.condition(arg[0])) {
    process.exit(0);
  }
};

const args = process.argv.slice(2);

const index = list.findIndex((value) => value.condition(args[0]));

if (list[index]) {
  executeParam(list[index], args).catch(() => console.error(colors.red(`Can't execute`)));
} else {
  console.error(`${colors.red(`To list possible options use`)} ${colors.green(help.name)}`);
  process.exit(1);
}
