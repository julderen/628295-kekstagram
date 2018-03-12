const oneOf = (choices) => {
  return {
    assert(option) {
      return choices.indexOf(option) >= 0;
    },
    message: `should be one of [${choices}]`
  };
};

const unique = () => ({
  assert(options) {
    const set = new Set(options);
    return set.size === options.length;
  },
  message: `should be unique`
});

const anyOf = (choices) => ({
  assert(options) {
    const assertion = oneOf(choices);
    return options.every((it) => assertion.assert(it));
  },
  message: `should be one of [${choices}]`
});

const inRange = (from, to) => ({
  assert(number) {
    return number >= from && number <= to;
  },
  message: `should be in range ${from}..${to}`
});
const textRange = (from, to) => ({
  assert(text) {
    return text.length >= from && text.length <= to;
  },
  message: `should be in range ${from}..${to}`
});

const isImage = () => ({
  assert(image) {
    return image.mimetype.startsWith(`image/`);
  },
  message: `should be an image`
});

const textStartWith = (symbol) => ({
  assert(text) {
    return text.startsWith(symbol);
  },
  message: `should be start with ${symbol}`
});

const every = (assertion) => ({
  assert(array) {
    return array.every(assertion.assert);
  },
  message: `all elements ${assertion.message}`
});

const countRange = (max) => ({
  assert(array) {
    return array.length <= max;
  },
  message: `length should be less ${max}`
});

module.exports = {
  oneOf,
  unique,
  anyOf,
  every,
  textStartWith,
  inRange,
  textRange,
  countRange,
  isImage,
};
