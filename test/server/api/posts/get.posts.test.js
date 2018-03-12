const request = require(`supertest`);
const assert = require(`assert`);
const mockPostController = require(`./mock.postController`);
const app = require(`express`)();

app.use(`/api/posts`, mockPostController);

describe(`GET /api/posts`, () => {
  it(`respond with json`, () => {
    return request(app)
        .get(`/api/posts`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const page = response.body;

          assert.equal(page.data.length, 50);
          assert.equal(Object.keys(page.data[0]).length, 8);
        });
  });
  it(`respond with json with length 1`, () => {
    return request(app)
        .get(`/api/posts`)
        .query({limit: `1`})
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const page = response.body;

          assert.equal(page.data.length, 1);
          assert.equal(Object.keys(page.data[0]).length, 8);
        });
  });
});
