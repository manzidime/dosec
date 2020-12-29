const express = require('express');
const tauxController = require('./../controller/tauxController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.route('/').post(tauxController.checkData, tauxController.createOne)
    .get(tauxController.getAll);

module.exports = router;