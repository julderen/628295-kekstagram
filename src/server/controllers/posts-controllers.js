const {Router} = require(`express`);
const multer = require(`multer`);
const asyncMiddleware = require(`../middleware/async-middleware`);

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

postRouter.post(`/`, upload.single(`filename`), asyncMiddleware(async (req, res) => {
  const data = await postRouter.postsService.createPost(req.body, req.file);
  return res.json(data);
}));

module.exports = (postsService) => {
  postRouter.postsService = postsService;
  return postRouter;
};
