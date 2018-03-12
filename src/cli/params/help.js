const colors = require(`colors`);
const paramsUtils = require(`../utils/params-utils`);

module.exports = (params) => ({
  name: `--help`,
  description: `Shows all params`,
  condition(param) {
    return paramsUtils.defaultCondition(this.name, param);
  },
  execute() {
    console.log(`Accessible params:
  ${params.map(({name, description}) => `${colors.grey(name)} - ${colors.green(description)}`).join(`\n  `)}`);
  }
});
