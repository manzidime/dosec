const express = require('express');
const categorieController = require('./../controller/categorieController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.route('/')
.get(categorieController.getAllCategorie);

router.route('/:id')
.get(categorieController.getCategorie);

module.exports = router;