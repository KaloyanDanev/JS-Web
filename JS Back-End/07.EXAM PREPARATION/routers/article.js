const router = require('express').Router();
const controllers = require('../controllers');
const auth = require('../utils/auth');
const articleValidator = require('../utils/validator');

router.get('/create', auth(), controllers.article.get.create);

router.post('/create', auth(), articleValidator, controllers.article.post.create);

router.get('/details/:articleId', auth(), controllers.article.get.details);

router.get('/edit/:articleId', auth(), controllers.article.get.edit);

router.post('/edit/:articleId', auth(), articleValidator, controllers.article.post.edit);

router.get('/delete/:articleId', auth(), controllers.article.get.delete);

module.exports = router;