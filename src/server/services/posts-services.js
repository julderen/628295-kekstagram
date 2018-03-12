const {validateSchema} = require(`../utils/validation-utils`);
const ValidationError = require(`../errors/validation-error`);
const NotFoundError = require(`../errors/not-found-error`);
const postScheme = require(`../scheme/post-scheme`);
const createStreamFromBuffer = require(`../utils/buffer-to-stream`);
const servicesUtils = require(`../utils/services-utils`);

let postsServices;

const getPosts = async (limit, skip) =>
  await (servicesUtils.definePage(await postsServices.postsStore.getAllPosts(), skip, limit));

const getPostByDate = async (date) => {
  const data = await postsServices.postsStore.getPost(date);

  if (!data) {
    throw new NotFoundError();
  }

  return data;
};

const createPost = async (data, file) => {
  const errors = validateSchema(Object.assign({}, data, {filename: file}), postScheme);
  const date = Date.now();

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  data.url = `/api/posts/${date}/image`;
  const fullDate = Object.assign({date, comments: []}, data);

  await postsServices.imagesStore.save(data.url, createStreamFromBuffer(file.buffer), {contentType: file.mimetype});
  await postsServices.postsStore.save(fullDate);

  return fullDate;
};

const getImageByDate = async (date) => {
  const image = await postsServices.imagesStore.get(`/api/posts/${date}/image`);

  if (!image) {
    throw new NotFoundError(`File was not found`);
  }

  return image;
};

module.exports = (postsStore, imagesStore) => {
  postsServices = {
    postsStore,
    imagesStore
  };

  return {
    getPosts,
    getPostByDate,
    createPost,
    getImageByDate
  };
};
