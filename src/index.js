const args = process.argv.slice(2);
const params = require(`./params/index`);

params.checkParam(args[0]);
