const express = require('express');
const apiController = require('./../controller/apiController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.patch('/disable-active/:id', apiController.disableOrActive)



router.route('/')
.get(apiController.getAll)
.post(apiController.checkData, apiController.create);

router.route('/:id')
.get(apiController.getOne)
.patch(apiController.updateOne);

module.exports = router;