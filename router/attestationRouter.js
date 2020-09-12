const express = require('express');
const attestationController = require('./../controller/attestationController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.delete('/disableOrActive/:id', attestationController.disableOrActive);

router.route('/')
.post(attestationController.getIdUser,
    attestationController.checkData,
    attestationController.createOne)
.get(attestationController.getAll);

router.route('/:id')
.get(attestationController.getOne)
.patch(attestationController.updateOne);

module.exports = router;