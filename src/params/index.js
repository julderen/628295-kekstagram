const author = require(`./author-param`);
const description = require(`./description-param`);
const license = require(`./license-param`);
const version = require(`./version-param`);
const empty = require(`./empty-param`);
const help = require(`./help-param`);

const params = [
  author,
  description,
  license,
  help,
  empty,
  version
];

module.exports = {
  checkParam(arg) {
    const index = params.findIndex((value) => value.predicate(arg));

    if (params[index]) {
      params[index].execute();
    } else {
      console.error(`To list possible options use --'${help.name}'`);
      process.exitCode = 1;
    }

  }
};
