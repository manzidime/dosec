const express = require('express');
const vehiculeController = require('./../controller/vehiculeController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.delete('/disableOrActive/:id', vehiculeController.disableOrActive);
router.get('/contribuable/:id', vehiculeController.getByOther);
router.get('/cars/:contribuable/:service', vehiculeController.getAllCar);
router.get('/other/:contribuable/:service', vehiculeController.proprieteNonVehicules);
router.get('/list-vehicule', vehiculeController.listVehicules);

router.route('/')
.post(vehiculeController.checkData,vehiculeController.getIdVehicules,
    vehiculeController.createVehicule)
.get(vehiculeController.getAllVehicule);

router.route('/:id')
.get(vehiculeController.getVehicule)
.patch(vehiculeController.updateContribuable);

module.exports = router;