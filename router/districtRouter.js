const express = require('express');
const districtController = require('./../controller/districtController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.route('/')
.post(districtController.checkData, districtController.createDistrict)
.get(districtController.getAllDistrict);

router.route('/:id')
.get(districtController.getDistrict)
.patch(districtController.updateDistrict);

module.exports = router;