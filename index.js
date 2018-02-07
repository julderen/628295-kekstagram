const arg = process.argv.slice(2)[0];
const params = {
  help: `--help`,
  version: `--version`
};

switch (arg) {
  case params.help:
    console.log(`This app doesn't do anything.
Accessible params:
  ${params.help}     - print info
  ${params.version}  - print app version`);
    break;
  case params.version:
    console.log(`Version 0.0.1`);
    break;
  case undefined:
    console.log(`This app doesn't do anything.
It was developed by Korokhodkin Denis.
To list possible options use '${params.help}'`);
    break;
  default:
    console.error(`To list possible options use '${params.help}'`);
    process.exitCode = 1;
}
