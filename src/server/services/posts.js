const {validateSchema} = require(`../utils/validationUtils`);
const ValidationError = require(`../errors/validationError`);
const NotFoundError = require(`../errors/notFoundError`);
const postScheme = require(`../scheme/postScheme`);
const createStreamFromBuffer = require(`../utils/bufferToStream`);

const DATA_FILTER = {
  limit: 10,
  skip: 0
};
let postsStore;
let imagesStore;

const getPosts = async (limit, skip) =>
  await (await postsStore.getAllPosts())
      .skip((skip && parseInt(skip, 10)) || DATA_FILTER.skip)
      .limit((limit && parseInt(limit, 10)) || DATA_FILTER.limit)
      .toArray();

const getPostByDate = async (date) => {
  const data = await postsStore.getPost(date);

  if (!data) {
    throw new NotFoundError();
  }

  return data;
};

const createPost = async (data) => {
  const errors = validateSchema(data, postScheme);
  const date = Date.now();

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  const filenameInfo = {
    path: `/api/posts/${date}/image`,
    mimetype: data.filename.mimetype
  };

  await imagesStore.save(filenameInfo.path, createStreamFromBuffer(data.filename.buffer));
  data.filename = filenameInfo;

  const fullDate = Object.assign({}, data, {date});
  await postsStore.save(fullDate);

  return fullDate;
};

const getImageByDate = async (date) => {
  const post = await postsStore.getPost(date);

  if (!post) {
    throw new NotFoundError(`Post with date "${date}" not found`);
  }

  const image = await imagesStore.get(`/api/posts/${date}/image`);

  if (!image) {
    throw new NotFoundError(`File was not found`);
  }

  return Object.assign({}, image, {mimetype: post.filename.mimetype});
};

module.exports = (postsStoreArg, imagesStoresArg) => {
  postsStore = postsStoreArg;
  imagesStore = imagesStoresArg;

  return {
    getPosts,
    getPostByDate,
    createPost,
    getImageByDate
  };
};
