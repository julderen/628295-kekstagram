const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const postsControllers = require(`../../controllers/posts`);

const router = new Router();

router.use(bodyParser.json());
router.use(`/posts`, postsControllers());

module.exports = router;
