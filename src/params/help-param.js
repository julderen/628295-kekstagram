const author = require(`./author-param`);
const description = require(`./description-param`);
const license = require(`./license-param`);
const version = require(`./version-param`);
const params = [author, description, version, license];

module.exports = {
  name: `help`,
  description: `Shows all params`,
  predicate(arg) {
    return arg === `--${this.name}`;
  },
  execute() {
    console.log(`Accessible params:
  ${params.map((value) => `${value.name} - ${value.description}`).join(`\n  `)}`);
  }
};
