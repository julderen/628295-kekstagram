const assert = require(`assert`);
const defaultData = require(`../src/constants/defaultData`);
const dataGenerate = require(`../src/dataGenerate`);

describe(`data-generate`, () => {
  describe(`generateEntity()`, () => {
    it(`should return defaultData`, () => {
      assert.equal(dataGenerate.generateEntity(), defaultData);
    });
  });
});
