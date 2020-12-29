const express = require('express');
const tarifController = require('./../controller/tarifController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.patch('/disable-active/:id', tarifController.disableOrActive)
router.get('/tarif-taxation/:taxe/:article/:categorie/:echeance', tarifController.tarifTaxation)

router.route('/')
.get(tarifController.getAll)
.post(tarifController.checkData, tarifController.create);

router.route('/:id')
.get(tarifController.getOne)
.patch(tarifController.checkData, tarifController.updateOne);

module.exports = router;