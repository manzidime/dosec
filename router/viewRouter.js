const express = require('express');
const viewController = require('./../controller/viewController');
const authController = require('./../controller/authController');

//Mounting application
const router = express.Router();

router.get('/', viewController.login);

//Protection des pages
router.use(authController.protect);

router.get('/home', viewController.home);
router.get('/home/my-acount', viewController.myAcount);
router.get('/home/new-person', viewController.newPerson);
router.get('/home/all-person', viewController.listPerson);
router.get('/home/new-vehicule', viewController.newVehicule);
router.get('/home/all-vehicule', viewController.allVehicule);
router.get('/home/new-taxation', viewController.newTaxation);
router.get('/home/all-taxation', viewController.allTaxation);
router.get('/home/all-taxation-validate', viewController.allTaxationValidate);
router.get('/home/new-attestation', viewController.newAttestation);
router.get('/home/all-attestation', viewController.allAttestation);
router.get('/home/parts', viewController.partDosec);
router.get('/home/api-dosec', viewController.apiDosec);
router.get('/home/note', viewController.note);
router.get('/home/note/doc/:id', viewController.doc);

//Export router
module.exports = router;