const {Router} = require(`express`);
const multer = require(`multer`);
const postsService = require(`../services/posts`);

const router = new Router();
const upload = multer({storage: multer.memoryStorage()});

router.get(`/`, postsService.getPosts);
router.get(`/:date`, postsService.getPostByDate);
router.post(`/`, upload.single(`img`), postsService.createPost);

module.exports = router;
