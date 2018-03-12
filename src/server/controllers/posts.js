const {Router} = require(`express`);
const multer = require(`multer`);
const postsStore = require(`../stores/postsStore`);
const imagesStore = require(`../stores/imagesStore`);
const dataRnderUtils = require(`../utils/dataRnderUtils`);
const postsService = require(`../services/posts`)(postsStore, imagesStore);

const upload = multer({storage: multer.memoryStorage()});
const postRouter = new Router();

postRouter.get(`/`, async (req, res) => res.json(await postRouter.postsService.getPosts(req.query.limit, req.query.skip)));
postRouter.get(`/:date`, async (req, res) => {
  try {
    res.json(await postRouter.postsService.getPostByDate(parseInt(req.params.date, 10)));
  } catch (err) {
    res.status(err.code).send(err);
  }
});
postRouter.get(`/:date/image`, async (req, res) => {
  try {
    const {info, stream, mimetype} = await postRouter.postsService.getImageByDate(parseInt(req.params.date, 10));

    res.set(`content-type`, mimetype);
    res.set(`content-length`, info.length);
    res.status(200);
    stream.pipe(res);
  } catch (err) {
    res.status(err.code).send(err);
  }
});
postRouter.post(`/`, upload.single(`image`), async (req, res) => {
  try {
    res.json(await postRouter.postsService.createPost(Object.assign({}, req.body, {filename: req.file})));
  } catch (err) {
    res.status(400).send(err);
  }
});

postRouter.use((exception, req, res, next) => {
  dataRnderUtils.renderException(req, res, exception);
  next();
});

module.exports = (postsServiceArg = postsService) => {
  postRouter.postsService = postsServiceArg;
  return postRouter;
};
