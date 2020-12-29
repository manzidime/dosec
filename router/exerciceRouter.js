const express = require('express');
const exerciceController = require('./../controller/exerciceController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.route('/')
.get(exerciceController.getAll);

module.exports = router;