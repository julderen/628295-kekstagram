const {generateRandomNumberInRange, generateRandomString} = require(`./utils/dataGenerateUtils`);
const {
  EFFECTS,
  WORDS,
  MAX_SCALE,
  MAX_LIKES,
  MAX_LENGTH_DESCRIPTION,
  MAX_COUNT_HASH_TAGS,
  INITIAL_STRING_HASH_TAGS,
  MAX_COUNT_COMMENTS,
  MAX_URL,
  MAX_LENGTH_COMMENT
} = require(`./constants/dataGenerateConstants`);

module.exports = {
  generateUrl() {
    return `https://picsum.photos/600/?${generateRandomNumberInRange(MAX_URL)}`;
  },

  generateScale() {
    return generateRandomNumberInRange(MAX_SCALE);
  },

  generateEffect() {
    return EFFECTS[generateRandomNumberInRange(EFFECTS.length - 1)];
  },

  generateLikes() {
    return generateRandomNumberInRange(MAX_LIKES);
  },

  generateHashTags() {
    const countHashTags = generateRandomNumberInRange(MAX_COUNT_HASH_TAGS);
    let hashTags = [];
    let hashTag = ``;

    for (let i = 0; i < countHashTags; i++) {
      do {
        const indexHashTag = generateRandomNumberInRange(WORDS.length - 1);

        hashTag = `${INITIAL_STRING_HASH_TAGS}${WORDS[indexHashTag]}`;
      } while (hashTags.includes(hashTag));

      hashTags.push(hashTag);
    }

    return hashTags;
  },

  generateDescription() {
    return generateRandomString(MAX_LENGTH_DESCRIPTION, WORDS);
  },

  generateComments() {
    let comments = [];
    const countComments = generateRandomNumberInRange(MAX_COUNT_COMMENTS);

    for (let i = 0; i < countComments; i++) {
      comments.push(generateRandomString(MAX_LENGTH_COMMENT, WORDS));
    }

    return comments;
  },

  generateEntities(count) {
    let data = [];

    for (let i = 0; i < count; i++) {
      data.push(this.generateEntity());
    }

    return data;
  },

  generateEntity() {
    return {
      url: this.generateUrl(),
      scale: this.generateScale(),
      effect: this.generateEffect(),
      hashtags: this.generateHashTags(),
      description: this.generateDescription(),
      likes: this.generateLikes(),
      comments: this.generateComments()
    };
  }
};
