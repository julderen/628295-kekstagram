const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../../../../src/server/server`);

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
