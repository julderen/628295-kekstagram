const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../../../../src/server/server`);
const dataGenerate = require(`../../../../src/dataGenerator/dataGenerate`);

describe(`POST /api/posts`, () => {
  it(`respond with json`, () => {
    const data = dataGenerate.generateEntity();
    return request(app)
        .post(`/api/posts`)
        .send(data)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const resData = response.body;

          assert.deepEqual(resData, data);
        });
  });
});
