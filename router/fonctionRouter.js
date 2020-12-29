const express = require('express');
const fonctionController = require('./../controller/fonctionController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.route('/')
.get(fonctionController.getAll)

module.exports = router;