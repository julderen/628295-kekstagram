const colors = require(`colors`);
const readline = require(`readline`);

const dataGenerate = require(`../dataGenerate`);
const fileUtils = require(`./src/utils/fileUtils`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `user>`,
});

const ask = (question, condition) => new Promise((resolve, reject) => {
  rl.question(question, (line) => {
    if (!condition || condition(line)) {
      resolve(line);
    } else {
      reject(line);
    }
  });
});

const accessAsk = (question) => ask(question, (line) => line === `yes`);
const numberAsk = (question) => ask(
    question,
    (line) => {
      const number = parseInt(line, 10);

      return number && number > 0;
    });

module.exports = {
  name: ``,
  description: `Programs can generate entity and save to file`,
  condition(arg) {
    return !arg;
  },
  execute() {
    console.log(colors.grey(`Hi!`));
    accessAsk(`Do you want generate data and save in file? (yes or no)`)
        .then(() => numberAsk(`How much entity to generate? (number > 0)`))
        .then((line) => Promise.all([
          Promise.resolve(parseInt(line, 10)),
          ask(`Where you want save in file? (path/file name)`)
        ]))
        .then((res) => {
          const data = JSON.stringify(dataGenerate.generateEntities(res[0]));

          return fileUtils.open(res[1], `wx`)
              .then((fd) => fileUtils.writeDataToFile(fd, data))
              .catch((err) => {
                if (err.code === `EEXIST`) {
                  return accessAsk(`Do you want rewrite file? (yes or no)`)
                      .then(() => fileUtils.writeDataToFile(res[1], data));
                }

                return err;
              });
        })
        .then(() => rl.close())
        .catch(() => {
          rl.close();
          console.log(`Bye`);
        });
  }
};
