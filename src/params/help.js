const colors = require(`colors`);
const paramsUtils = require(`../utils/paramsUtils`);

module.exports = {
  name: `--help`,
  description: `Shows all params`,
  condition(param) {
    paramsUtils.defaultCondition(this.name, param);
  },
  execute() {
    const params = require(`./params`);

    console.log(`Accessible params:
  ${params.list.map(({name, description}) => `${colors.grey(name)} - ${colors.green(description)}`).join(`\n  `)}`);
  }
};
