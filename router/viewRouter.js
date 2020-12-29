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
router.get('/home/new-contribuable', viewController.newPerson);
router.get('/home/new-propriete', viewController.newPropriete);
router.get('/home/all-person', viewController.listPerson);
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
router.get('/home/new-user', viewController.newUser);
router.get('/home/all-user', viewController.allUser);
router.get('/home/site', viewController.site);
router.get('/home/service', viewController.service);
router.get('/home/tarif', viewController.tarif);
router.get('/home/taxe', viewController.taxe);
router.get('/home/article', viewController.article);
router.get('/home/taux', viewController.taux);
router.get('/home/print', viewController.print);
router.get('/home/print/:id/:plaque', viewController.doc2);

//Export router
module.exports = router;