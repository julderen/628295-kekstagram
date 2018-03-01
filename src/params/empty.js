const colors = require(`colors`);

const dataGenerate = require(`../dataGenerate`);
const fileUtils = require(`../utils/fileUtils`);
const askUtils = require(`../utils/askUtils`);

const generateEntitiesQuestion = () => askUtils.accessAsk(`Do you want generate entity and save in file? (yes or no)`);
const howManyEntitiesQuestion = () => askUtils.numberAsk(`How much entity to generate? (number > 0)`);
const whenSaveEntitiesQuestion = (line) => new Promise((resolve, reject) => {
  askUtils.ask(`Where you want save in file? (path/file name)`)
      .then((path) => resolve({countEntities: parseInt(line, 10), path}))
      .catch(reject);
});

const onFileNotExist = (data) => (fd) => (
  fileUtils.writeFile(fd, data)
);
const onFileExist = (data) => (path) => (
  askUtils.accessAsk(`Do you want rewrite file? (yes or no)`)
      .then(() => fileUtils.writeFile(path, data))
);
const saveEntitiesInFile = ({countEntities, path}) => {
  const data = JSON.stringify(dataGenerate.generateEntities(countEntities));

  return fileUtils.checkExistenceFile(path, onFileExist(data), onFileNotExist(data));
};

const finallyActions = () => {
  askUtils.close();
};

const exitActions = (err) => {
  finallyActions();

  if (!err) {
    return console.log(`Bye`);
  }

  process.exitCode = 1;
  return console.error(err);
};

module.exports = {
  name: ``,
  description: `Programs can generate entity and save to file`,
  condition(arg) {
    return !arg;
  },
  execute() {
    console.log(colors.grey(`Hi!`));

    generateEntitiesQuestion()
        .then(howManyEntitiesQuestion)
        .then(whenSaveEntitiesQuestion)
        .then(saveEntitiesInFile)
        .then(finallyActions)
        .catch(exitActions);
  }
};
