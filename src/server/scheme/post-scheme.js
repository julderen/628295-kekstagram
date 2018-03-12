const {
  every,
  textStartWith,
  isImage,
  oneOf,
  inRange,
  countRange,
  unique,
  textRange
} = require(`../utils/assertion-utils`);
const {
  MAX_SCALE,
  MIN_COUNT,
  EFFECTS,
  INITIAL_STRING_HASH_TAGS,
  MAX_COUNT_HASH_TAGS,
  MAX_LENGTH_HASH_TAG,
  MAX_LENGTH_DESCRIPTION
} = require(`../../data-generator/constants/data-generate-constants`);

const schema = {
  'filename': {
    required: true,
    assertions: [
      isImage()
    ]
  },
  'scale': {
    required: true,
    converter: (val) => parseInt(val.replace(/%/i, ``), 10),
    assertions: [
      inRange(MIN_COUNT, MAX_SCALE)
    ]
  },
  'effect': {
    required: true,
    assertions: [
      oneOf(EFFECTS)
    ]
  },
  'hashtags': {
    required: false,
    converter: (val) => val && val.toLowerCase().split(` `),
    assertions: [
      every(textStartWith(INITIAL_STRING_HASH_TAGS)),
      every(textRange(MIN_COUNT, MAX_LENGTH_HASH_TAG)),
      unique(),
      countRange(MAX_COUNT_HASH_TAGS)
    ]
  },

  'description': {
    required: false,
    assertions: [
      textRange(MIN_COUNT, MAX_LENGTH_DESCRIPTION)
    ]
  }
};

module.exports = schema;
