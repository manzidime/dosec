const express = require('express');
const taxeController = require('./../controller/taxeController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.get('/type/:id', taxeController.getOther);

router.route('/')
.get(taxeController.getAll);

router.route('/:id')
.get(taxeController.getOne);


module.exports = router;