const express = require('express');
const vehiculeController = require('./../controller/vehiculeController');
const authController = require('./../controller/authController');

const router = express.Router();

//Protection de ressources
router.use(authController.protect);

router.delete('/disableOrActive/:id', vehiculeController.disableOrActive);

router.get('/contribuable/:id', vehiculeController.getByOther);


router.route('/')
.post(vehiculeController.getIdVehicules,
    vehiculeController.checkData,
    vehiculeController.createVehicule)
.get(vehiculeController.getAllVehicule);

router.route('/:id')
.get(vehiculeController.getVehicule)
.patch(vehiculeController.updateContribuable);

module.exports = router;