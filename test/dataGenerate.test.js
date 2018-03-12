const {describe, it} = require(`mocha`);
const assert = require(`assert`);

const dataGenerate = require(`../src/data-generator/data-generate`);
const {
  EFFECTS,
  MAX_SCALE,
  MAX_LIKES,
  MAX_LENGTH_DESCRIPTION,
  MAX_COUNT_HASH_TAGS,
  INITIAL_STRING_HASH_TAGS,
  MAX_LENGTH_HASH_TAG,
  MAX_LENGTH_COMMENT,
  MIN_COUNT
} = require(`../src/data-generator/constants/data-generate-constants`);

describe(`dataGenerate generateEntity()`, () => {
  const entity = dataGenerate.generateEntity();

  describe(`url`, () => {
    const url = entity.url;

    it(`should return string`, () => {
      assert.equal(typeof (url), `string`);
    });

    it(`should start with 'http://' or 'https://'`, () => {
      assert(!url.startsWith(`http://`) || !url.startsWith(`https://`));
    });
  });

  describe(`scale`, () => {
    const scale = entity.scale;

    it(`should be number`, () => {
      assert.equal(typeof (scale), `number`);
    });

    it(`should be more or equal ${MIN_COUNT}`, () => {
      assert(scale >= MIN_COUNT);
    });

    it(`should be less or equal ${MAX_SCALE}`, () => {
      assert(scale <= MAX_SCALE);
    });
  });

  describe(`effect`, () => {
    const effect = entity.effect;

    it(`should be string`, () => {
      assert.equal(typeof (effect), `string`);
    });

    it(`should be one of world ${EFFECTS.join(`, `)}`, () => {
      assert(EFFECTS.includes(effect));
    });
  });

  describe(`hashtags`, () => {
    const hashtags = entity.hashtags;
    const splitHashtags = hashtags ? hashtags.split(` `) : [];

    it(`should be string`, () => {
      assert(typeof (hashtags), `string`);
    });

    it(`hashtags should be less or equal ${MAX_COUNT_HASH_TAGS}`, () => {
      assert(splitHashtags.length <= MAX_COUNT_HASH_TAGS);
    });

    it(`hashtag should be start with '${INITIAL_STRING_HASH_TAGS}'`, () => {
      for (let i = 0; i < splitHashtags.length; i++) {
        assert(splitHashtags[i].startsWith(INITIAL_STRING_HASH_TAGS));
      }
    });

    it(`hashtag should be haven't ' '`, () => {
      assert(splitHashtags.length >= 0);
    });

    it(`hashtag should be word max length ${MAX_LENGTH_HASH_TAG}`, () => {
      for (let i = 0; i < hashtags.length; i++) {
        assert(hashtags[i].length <= MAX_LENGTH_HASH_TAG + INITIAL_STRING_HASH_TAGS.length);
      }
    });

    it(`hashtags should be haven't same words`, () => {
      for (let i = 0; i < splitHashtags.length - 1; i++) {
        assert(splitHashtags.indexOf(splitHashtags[i], i + 1) === -1);
      }
    });
  });

  describe(`description`, () => {
    const description = entity.description;

    it(`should return string`, () => {
      assert.equal(typeof (description), `string`);
    });

    it(`description length should be less or equal ${MAX_LENGTH_DESCRIPTION}`, () => {
      assert(description.length <= MAX_LENGTH_DESCRIPTION);
    });
  });

  describe(`likes`, () => {
    const likes = entity.likes;

    it(`should return number`, () => {
      assert.equal(typeof (likes), `number`);
    });

    it(`should be more or equal ${MIN_COUNT}`, () => {
      assert(likes >= MIN_COUNT);
    });

    it(`should be less or equal ${MAX_LIKES}`, () => {
      assert(likes <= MAX_LIKES);
    });
  });

  describe(`comments`, () => {
    const comments = entity.comments;

    it(`should return array`, () => {
      assert(Array.isArray(comments));
    });

    it(`comment should be word max length ${MAX_LENGTH_COMMENT}`, () => {
      for (let i = 0; i < comments.length; i++) {
        assert(comments[i].length <= MAX_LENGTH_COMMENT);
      }
    });
  });
});

describe(`dataGenerate`, () => {
  describe(`generateEntities()`, () => {
    it(`should return array of length 5`, () => {
      assert.equal(dataGenerate.generateEntities(5).length, 5);
    });
  });
});
