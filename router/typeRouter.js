const express = require('express');
const typeController = require('./../controller/typeobjetController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.route('/')
.get(typeController.getAll);


module.exports = router;