const dataGenerate = require(`../../dataGenerator/dataGenerate`);
const {validateSchema} = require(`../utils/validationUtils`);
const ValidationError = require(`../errors/validationError`);
const postScheme = require(`../scheme/post`);

const DATA_FILTER = {
  limit: 10,
  skip: 0
};

const getPosts = async (limit) =>
  await dataGenerate.generateEntities(limit || DATA_FILTER.limit);

const getPostByDate = async (date) => await dataGenerate.generateEntity(date);

const createPost = (data) => {
  const errors = validateSchema(data, postScheme);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  return data;
};

module.exports = {
  getPosts,
  getPostByDate,
  createPost
};
