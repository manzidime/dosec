const express = require('express');
const taxeController = require('./../controller/taxeController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.get('/type/:id', taxeController.getOther);
router.patch('/state/:id', taxeController.state);

router.route('/').post(taxeController.checkData, taxeController.createOne)
.get(taxeController.getAll);

router.route('/:id')
.get(taxeController.getOne).patch(taxeController.checkData, taxeController.updateOne);


module.exports = router;