const {
  every,
  textStartWith,
  isImage,
  oneOf,
  inRange,
  countRange,
  unique,
  textRange
} = require(`../utils/assertionUtils`);
const {
  MAX_SCALE,
  MIN_COUNT,
  EFFECTS,
  INITIAL_STRING_HASH_TAGS,
  MAX_COUNT_HASH_TAGS,
  MAX_LENGTH_HASH_TAG,
  MAX_LENGTH_DESCRIPTION
} = require(`../../dataGenerator/constants/dataGenerateConstants`);

const schema = {
  'filename': {
    required: true,
    assertions: [
      isImage()
    ]
  },
  'scale': {
    required: true,
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
    converter: (val) => val.toLowerCase().split(` `),
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
