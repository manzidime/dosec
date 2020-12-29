const express = require('express');
const serviceController = require('./../controller/serviceController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.patch('/disable-active/:id', serviceController.disableOrActive)

router.route('/')
.get(serviceController.getAll)
.post(serviceController.checkData, serviceController.create);

router.route('/:id')
.get(serviceController.getOne)
.patch(serviceController.updateOne);

module.exports = router;