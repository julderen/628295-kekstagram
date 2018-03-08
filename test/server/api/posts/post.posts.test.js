const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../../../../src/server/server`);
const dataGenerate = require(`../../../../src/dataGenerator/dataGenerate`);

const VALID_POST = 	{
  'scale': 22,
  'effect': `marvin`,
  'hashtags': `#like #fly #good`,
  'description': `bro goal body funny fly women bro pure time new goal funny body`,
  'likes': 535,
  'comments': [`funny like good funny goal try future i body women`]
};
const pathToImage = `test/fixtures/logo-background-3.jpg`;

describe(`POST /api/posts`, () => {
  it(`respond with json`, () => {
    return request(app)
        .post(`/api/posts`)
        .field(`scale`, 22)
        .field(`effect`, `marvin`)
        .field(`hashtags`, `#like #fly #good`)
        .field(`description`, `bro goal body funny fly women bro pure time new goal funny body`)
        .field(`likes`, 535)
        .field(`comments`, [`funny like good funny goal try future i body women`])
        .attach(`filename`, pathToImage)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/);
  });
  it(`respond 400 empty scale`, () => {
    return request(app)
        .post(`/api/posts`)
        .field(`effect`, `marvin`)
        .field(`hashtags`, `#like #fly #good`)
        .field(`description`, `bro goal body funny fly women bro pure time new goal funny body`)
        .field(`likes`, 535)
        .field(`comments`, [`funny like good funny goal try future i body women`])
        .attach(`filename`, pathToImage)
        .set(`Accept`, `application/json`)
        .expect(400)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const errors = response.body;
          console.log(errors);
          assert.deepEqual(errors, {
            "errors": [{
              "fieldName": `scale`,
              "errorMessage": `is required`
            }]
          });
        });
  });
});
