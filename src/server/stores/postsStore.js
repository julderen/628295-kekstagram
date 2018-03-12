const db = require(`../../database/database`);

const setupCollection = async () => {
  const dBase = await db;

  const collection = dBase.collection(`posts`);
  collection.createIndex({date: -1}, {unique: true});
  return collection;
};

class PostsStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getPost(date) {
    return (await this.collection).findOne({date});
  }

  async getAllPosts() {
    return (await this.collection).find();
  }

  async save(postData) {
    return (await this.collection).insertOne(postData);
  }

}

module.exports = new PostsStore(setupCollection().catch(() => process.exit(1)));
