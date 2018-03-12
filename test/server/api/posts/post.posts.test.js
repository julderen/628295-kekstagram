const request = require(`supertest`);
const assert = require(`assert`);
const mockPostController = require(`./mock.postController`);
const app = require(`express`)();

app.use(`/api/posts`, mockPostController);

const {
  every,
  textStartWith,
  oneOf,
  textRange
} = require(`../../../../src/server/utils/assertion-utils`);
const {
  EFFECTS,
  INITIAL_STRING_HASH_TAGS,
  MIN_COUNT,
  MAX_LENGTH_DESCRIPTION
} = require(`../../../../src/data-generator/constants/data-generate-constants`);

const filename = [`filename`, `test/fixtures/logo-background-3.jpg`];
const scale = [`scale`, 22];
const effect = [`effect`, `marvin`];
const requeredMessage = `is required`;

const generateErrorEntity = (fieldName, errorMessage, value) => ({
  "errors": [
    Object.assign({
      "fieldName": fieldName,
      "errorMessage": errorMessage,
    },
    value && {"fieldValue": value}
    )]
});

describe(`POST /api/posts`, () => {
  it(`respond with json`, () => {
    return request(app)
        .post(`/api/posts`)
        .field(...scale)
        .field(...effect)
        .attach(...filename)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/);
  });
  it(`respond 400 scale is required`, () => {
    return request(app)
        .post(`/api/posts`)
        .field(...effect)
        .attach(...filename)
        .set(`Accept`, `application/json`)
        .expect(400)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          assert.deepEqual(response.body, generateErrorEntity(`scale`, requeredMessage));
        });
  });
  it(`respond 400 filename is required`, () => {
    return request(app)
        .post(`/api/posts`)
        .field(...scale)
        .field(...effect)
        .set(`Accept`, `application/json`)
        .expect(400)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          assert.deepEqual(response.body, generateErrorEntity(`filename`, requeredMessage));
        });
  });
  it(`respond 400 effect is required`, () => {
    return request(app)
        .post(`/api/posts`)
        .field(...scale)
        .attach(...filename)
        .set(`Accept`, `application/json`)
        .expect(400)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          assert.deepEqual(response.body, generateErrorEntity(`effect`, requeredMessage));
        });
  });
  it(`respond 400 effect is oneOf EFFECTS`, () => {
    const effectValue = `random word`;

    return request(app)
        .post(`/api/posts`)
        .field(`effect`, effectValue)
        .field(...scale)
        .attach(...filename)
        .set(`Accept`, `application/json`)
        .expect(400)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          assert.deepEqual(response.body, generateErrorEntity(`effect`, oneOf(EFFECTS).message, effectValue));
        });
  });
  it(`respond 400 hashtags is start with ${INITIAL_STRING_HASH_TAGS}`, () => {
    const hashtagsValue = `#like #fly good`;
    return request(app)
        .post(`/api/posts`)
        .field(...effect)
        .field(...scale)
        .field(`hashtags`, hashtagsValue)
        .attach(...filename)
        .set(`Accept`, `application/json`)
        .expect(400)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          assert.deepEqual(
              response.body,
              generateErrorEntity(`hashtags`, every(textStartWith(INITIAL_STRING_HASH_TAGS)).message, hashtagsValue)
          );
        });
  });
  it(`respond 400 description is textRange from ${MIN_COUNT} to ${MAX_LENGTH_DESCRIPTION}`, () => {
    const descriptionValue = `bro goal body funnyfunnyfunnyfunnyfunnyfunnyfunnyfunnyfunnyfunnyfunnyfunnyfunnyfunnyfunnyfu
    nnyfunnyfunnyfunnyfunnyfunnyfunnyfunnyfunnyfunnyfunny fly women bro pure time new goal funny body`;
    return request(app)
        .post(`/api/posts`)
        .field(...effect)
        .field(...scale)
        .field(`description`, descriptionValue)
        .attach(...filename)
        .set(`Accept`, `application/json`)
        .expect(400)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          assert.deepEqual(
              response.body,
              generateErrorEntity(`description`, textRange(MIN_COUNT, MAX_LENGTH_DESCRIPTION).message, descriptionValue)
          );
        });
  });
});
