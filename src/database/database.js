const {MongoClient} = require(`mongodb`);

const url = process.env.MONGO_URL || `mongodb://localhost:27017`;

module.exports = MongoClient.connect(url).then((client) => client.db(`kekstogram`)).catch(() => {
  process.exit(1);
});
