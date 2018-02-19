const {describe, it} = require(`mocha`);
const assert = require(`assert`);
const dataGenerate = require(`../src/dataGenerate`);

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

    it(`should be more or equal 0`, () => {
      assert(scale >= 0);
    });

    it(`should be less or equal 100`, () => {
      assert(scale <= 100);
    });
  });

  describe(`effect`, () => {
    const effect = entity.effect;
    const EFFECTS = [`chrome`, `sepia`, `marvin`, `phobos`, `heat`];

    it(`should be string`, () => {
      assert.equal(typeof (effect), `string`);
    });

    it(`should be one of world ${EFFECTS.join(`, `)}`, () => {
      assert(EFFECTS.includes(effect));
    });
  });

  describe(`hashtags`, () => {
    const hashtags = entity.hashtags;

    it(`should be array`, () => {
      assert(Array.isArray(hashtags));
    });

    it(`hashtags should be less or equal 5`, () => {
      assert(hashtags.length <= 5);
    });

    it(`hashtag should be start with '#'`, () => {
      for (let i = 0; i < hashtags.length; i++) {
        assert(hashtags[i].startsWith(`#`));
      }
    });

    it(`hashtag should be haven't ' '`, () => {
      for (let i = 0; i < hashtags.length; i++) {
        assert(!hashtags[i].includes(` `));
      }
    });

    it(`hashtag should be word max length 20`, () => {
      for (let i = 0; i < hashtags.length; i++) {
        assert(hashtags[i].length <= 20 + 1);
      }
    });

    it(`hashtags should be haven't same words`, () => {
      for (let i = 0; i < hashtags.length - 1; i++) {
        assert(hashtags.indexOf(hashtags[i], i + 1) === -1);
      }
    });
  });

  describe(`description`, () => {
    const description = entity.description;

    it(`should return string`, () => {
      assert.equal(typeof (description), `string`);
    });

    it(`description length should be less or equal 140`, () => {
      assert(description.length <= 140);
    });
  });

  describe(`likes`, () => {
    const likes = entity.likes;

    it(`should return number`, () => {
      assert.equal(typeof (likes), `number`);
    });

    it(`should be more or equal 0`, () => {
      assert(likes >= 0);
    });

    it(`should be less or equal 1000`, () => {
      assert(likes <= 1000);
    });
  });

  describe(`comments`, () => {
    const comments = entity.comments;

    it(`should return array`, () => {
      assert(Array.isArray(comments));
    });

    it(`comment should be word max length 140`, () => {
      for (let i = 0; i < comments.length; i++) {
        assert(comments[i].length <= 140);
      }
    });
  });
});
