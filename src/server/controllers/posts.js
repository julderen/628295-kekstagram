const {Router} = require(`express`);
const multer = require(`multer`);
const postsService = require(`../services/posts`);
const upload = multer({dest: `uploads/`});

const router = new Router();

router.get(`/`, async (req, res) => res.json(await postsService.getPosts(req.query.limit)));
router.get(`/:date`, async (req, res) => res.json(await postsService.getPostByDate(req.params.date)));

router.post(`/`, upload.single(`filename`), async (req, res) => {
  try {
    res.json(await postsService.createPost(Object.assign({}, req.body, {filename: req.file})));
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
