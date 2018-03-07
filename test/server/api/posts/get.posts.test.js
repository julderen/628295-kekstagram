const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../../../../src/server/server`);

describe(`GET /api/posts`, () => {
  it(`respond with json`, () => {
    return request(app)
        .get(`/api/posts`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const page = response.body;
          assert.equal(page.length, 10);
          assert.equal(Object.keys(page[0]).length, 8);
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
          assert.equal(page.length, 1);
          assert.equal(Object.keys(page[0]).length, 8);
        });
  });
});
