const express = require('express');
const contribuableController = require('./../controller/contribuableController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.delete('/disableOrActive/:id', contribuableController.disableOrActive);

router.route('/')
.post(contribuableController.getIdUser,
    contribuableController.checkData,
    contribuableController.createContribuable)
.get(contribuableController.getAllContribuable);

router.route('/:id')
.get(contribuableController.getContribuable)
.patch(contribuableController.checkData, contribuableController.updateContribuable);

module.exports = router;