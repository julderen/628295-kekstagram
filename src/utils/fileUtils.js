const fs = require(`fs`);
const {promisify} = require(`util`);

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const open = promisify(fs.open);
const readFile = promisify(fs.readFile);

const writeDataToFile = (fd, data) => (
  writeFile(fd, data)
      .then(() => {
        console.log(`File created`);
      })
      .catch((err) => {
        console.error(`File not created`, err.code);
        process.exitCode = 1;
      })
);

module.exports = {
  writeDataToFile,
  open,
  writeFile,
  readFile,
  unlink
};
