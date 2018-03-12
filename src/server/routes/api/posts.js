const {Router} = require(`express`);
const postsControllers = require(`../../controllers/posts-controllers`);
const postsStore = require(`../../stores/posts-store`);
const imagesStore = require(`../../stores/images-store`);
const postsService = require(`../../services/posts-services`)(postsStore, imagesStore);
const errorsHandlerMiddleware = require(`../../middleware/errors-handler-middleware`);

const router = new Router();

router.use(`/posts`, postsControllers(postsService));
router.use(errorsHandlerMiddleware);

module.exports = router;
