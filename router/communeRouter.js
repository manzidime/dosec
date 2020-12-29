const express = require('express');
const communeController = require('./../controller/communeController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.get('/by-district/:id', communeController.getByDistrict);

router.route('/')
.post(communeController.checkDataCommune, communeController.createCommune)
.get(communeController.getAllCommune);

router.route('/:id')
.get(communeController.getCommune)
.patch(communeController.updateCommune);

module.exports = router;