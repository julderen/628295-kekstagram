const args = process.argv.slice(2);
const params = require(`./params/params`);

params.checkParam(args);
