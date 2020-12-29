const express = require('express');
const articleController = require('./../controller/articleController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.get('/type/:id', articleController.getOther);
router.patch('/state/:id', articleController.state);

router.route('/').post(articleController.checkData,articleController.createArticle)
.get(articleController.getAllArticle);

router.route('/:id')
.get(articleController.getArticle).patch(articleController.checkData, articleController.updateArticle);

module.exports = router;