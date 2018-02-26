const fs = require(`fs`);
const {promisify} = require(`util`);

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const open = promisify(fs.open);
const readFile = promisify(fs.readFile);

const checkExistenceFile = (path, onExist, onNotExist) => open(path, `wx`)
    .then(onNotExist)
    .catch((err) => {
      if (err.code === `EEXIST`) {
        return onExist(path);
      }

      return err;
    });

module.exports = {
  open,
  writeFile,
  readFile,
  checkExistenceFile,
  unlink
};
