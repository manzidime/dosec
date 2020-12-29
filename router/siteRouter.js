const express = require('express');
const siteController = require('./../controller/siteController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.patch('/disable-active/:id', siteController.disableOrActive)

router.route('/')
.get(siteController.getAll)
.post(siteController.checkData, siteController.create);

router.route('/:id')
.get(siteController.getOne)
.patch(siteController.checkData, siteController.updateOne);

module.exports = router;