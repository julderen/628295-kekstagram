const {MongoClient} = require(`mongodb`);
const logger = require(`../server/logger`);

const url = `mongodb://${process.env.DB_HOST || `localhost:27017`}`;

module.exports = MongoClient.connect(url).then((client) => client.db(`kekstagram`)).catch((err) => {
  logger.error(err);
  process.exit(1);
});
