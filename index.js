const args = process.argv.slice(2);
const params = {
  help: `--help`,
  version: `--version`
};

if (args.length === 0) {
  console.log(`This app doesn't do anything.
It was developed by Korokhodkin Denis.`);
}

switch (args[0]) {
  case params.help:
    console.log(`This app doesn't do anything.
Accessible params:
  ${params.help}     - print info
  ${params.version}  - print app version`);
    break;
  case params.version:
    console.log(`Version 0.0.1`);
    break;
  default:
    console.error(`To list possible options use '${params.help}'`);
    process.exitCode = 1;
}
