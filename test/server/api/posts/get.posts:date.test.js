const request = require(`supertest`);
const assert = require(`assert`);
const mockPostController = require(`./mock.postController`);
const app = require(`express`)();

app.use(`/api/posts`, mockPostController);

describe(`GET /api/posts/:date`, () => {
  it(`respond with json`, () => {
    const date = Date.now();
    return request(app)
        .get(`/api/posts/${date}`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const post = response.body;
          assert.equal(post.date, date);
        });
  });
});
