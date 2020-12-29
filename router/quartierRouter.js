const express = require('express');
const quartierController = require('./../controller/quartierController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.get('/commune/:id', quartierController.getByCommune);

router.route('/')
.post(quartierController.checkData, quartierController.createQuartier)
.get(quartierController.getAllQuartier);

router.route('/:id')
.get(quartierController.getQuartier)
.patch(quartierController.updateQuartier);

module.exports = router;