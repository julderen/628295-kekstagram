const createPostsController = require(`../../../../src/server/controllers/posts`);
const createPostsServices = require(`../../../../src/server/services/posts`);
const dataGenerate = require(`../../../../src/dataGenerator/dataGenerate`);

const posts = dataGenerate.generateEntities(100);

class Cursor {
  constructor(data) {
    this.data = data;
  }

  skip(count) {
    return new Cursor(this.data.slice(count));
  }

  limit(count) {
    return new Cursor(this.data.slice(0, count));
  }

  async count() {
    return this.data.length;
  }

  async toArray() {
    return this.data;
  }
}

class MockPostsStore {
  constructor() {
  }

  async getPost(date) {
    return dataGenerate.generateEntity(date);
  }

  async getAllPosts() {
    return new Cursor(posts);
  }

  async save(data) {
    return data;
  }

}

class MockImageStore {

  async getBucket() {
  }

  async get() {
  }

  async save() {
  }

}

module.exports = createPostsController(createPostsServices(new MockPostsStore(), new MockImageStore()));
