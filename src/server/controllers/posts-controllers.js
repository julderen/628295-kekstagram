const {Router} = require(`express`);
const multer = require(`multer`);
const dataRenderUtils = require(`../utils/data-render-utils`);

const upload = multer({storage: multer.memoryStorage()});
const postRouter = new Router();

postRouter.get(`/`, async ({query: {limit, skip}}, res) => res.json(await postRouter.postsService.getPosts(
    limit && parseInt(limit, 10),
    skip && parseInt(skip, 10)
)));

postRouter.get(`/:date`, async (req, res) => {
  try {
    res.json(await postRouter.postsService.getPostByDate(parseInt(req.params.date, 10)));
  } catch (err) {
    res.status(err.code).send(err);
  }
});
postRouter.get(`/:date/image`, async (req, res) => {
  try {
    const {info, stream} = await postRouter.postsService.getImageByDate(parseInt(req.params.date, 10));
    console.log(info);
    res.set(`content-type`, info.contentType);
    res.set(`content-length`, info.length);
    res.status(200);
    stream.pipe(res);
  } catch (err) {
    res.status(err.code).send(err);
  }
});

postRouter.post(`/`, upload.single(`filename`), async (req, res) => {
  try {
    res.json(await postRouter.postsService.createPost(req.body, req.file));
  } catch (err) {
    res.status(400).send(err);
  }
});

postRouter.use((exception, req, res, next) => {
  dataRenderUtils.renderException(req, res, exception);
  next();
});

module.exports = (postsService) => {
  postRouter.postsService = postsService;
  return postRouter;
};
