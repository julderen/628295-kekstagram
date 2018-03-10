const {Router} = require(`express`);
const multer = require(`multer`);
const postsStore = require(`../stores/postsStore`);
const imagesStore = require(`../stores/imagesStore`);
const postsService = require(`../services/posts`)(postsStore, imagesStore);

const upload = multer({storage: multer.memoryStorage()});
const postRouter = new Router();

postRouter.get(`/`, async (req, res) => res.json(await postRouter.postsService.getPosts(req.query.limit, req.query.skip)));
postRouter.get(`/:date`, async (req, res) => res.json(await postRouter.postsService.getPostByDate(parseInt(req.params.date, 10))));
postRouter.get(`/:date/image`, async (req, res) => {
  const {info, stream, mimetype} = await postRouter.postsService.getImageByDate(parseInt(req.params.date, 10));

  res.set(`content-type`, mimetype);
  res.set(`content-length`, info.length);
  res.status(200);
  stream.pipe(res);
});
postRouter.post(`/`, upload.single(`image`), async (req, res) => {
  try {
    res.json(await postRouter.postsService.createPost(Object.assign({}, req.body, {filename: req.file})));
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = (postsServiceArg = postsService) => {
  postRouter.postsService = postsServiceArg;
  return postRouter;
};
