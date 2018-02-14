module.exports = {
  name: `help`,
  description: `Shows all params`,
  predicate(arg) {
    return arg === `--${this.name}`;
  },
  execute() {
    const params = require(`./params`);

    console.log(`Accessible params:
  ${params.list.map((value) => `${value.name} - ${value.description}`).join(`\n  `)}`);
  }
};
