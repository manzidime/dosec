const express = require('express');
const taxationController = require('./../controller/taxationController');
const apiController = require('./../controller/apiController')
const authController = require('./../controller/authController');

const router = express.Router();

router.get('/data/:cle', apiController.dataApi);


//Protection de ressources
router.use(authController.protect);

router.delete('/disableOrActive/:id', taxationController.disableOrActive);
router.patch('/activateTaxation/:id', taxationController.getIdUser, taxationController.validateTaxation);
router.get('/taxation-valide', taxationController.getAllValide);
router.get('/vehicules-taxations/:id', taxationController.getAllVehiculesTaxation);
router.get('/get-tarrif', taxationController.getTarrif)
router.get('/notes', taxationController.notes)

router.route('/')
.post(taxationController.getIdUser,
    taxationController.checkData,
    taxationController.create)
.get(taxationController.getAll);

router.route('/:id')
.get(taxationController.get)
.patch(taxationController.update);

module.exports = router;