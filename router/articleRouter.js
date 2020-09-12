const express = require('express');
const articleController = require('./../controller/articleController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.get('/type/:id', articleController.getOther);

router.route('/')
.get(articleController.getAllArticle);

router.route('/:id')
.get(articleController.getArticle);

module.exports = router;