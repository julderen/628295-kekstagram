const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const postsControllers = require(`../../controllers/posts-controllers`);
const postsStore = require(`../../stores/posts-store`);
const imagesStore = require(`../../stores/images-store`);
const postsService = require(`../../services/posts-services`)(postsStore, imagesStore);

const router = new Router();

router.use(bodyParser.json());
router.use(`/posts`, postsControllers(postsService));

module.exports = router;
