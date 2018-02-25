const readline = require(`readline`);

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
      reject();
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
const close = () => rl.close();

module.exports = {
  ask,
  accessAsk,
  numberAsk,
  close
};
