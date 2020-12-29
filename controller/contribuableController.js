const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Contribuable = require('./../model/contribuableModel');
const globalController = require('./globalController');

//Get id from user
exports.getIdUser = (req, res, next) => {
    if (!req.body.id_site) req.body.id_site = req.user.id_site;
    if (!req.body.id_agent) req.body.id_agent = req.user.id_agent;
    next();
};

exports.checkData = (req, res, next) => {
    const {nom, telephone, ville, id_district, id_commune, id_quartier, avenue, numero, observationContribuable} = req.body;

    if (!nom || !telephone || !ville || !id_district || !id_commune || !id_quartier || !avenue || !numero) {
        return next(new AppError('Veillez remplir tous champs!', 400));
    }

    next();
};


//Création d'un contribuable
exports.createContribuable = globalController.createRow(Contribuable);

//Get all
exports.getAllContribuable = globalController.getAllRows(Contribuable);

//Get One
exports.getContribuable = globalController.getRow(Contribuable);

//Update one
exports.updateContribuable = globalController.updateRow(Contribuable);

//Disable Or Active
exports.disableOrActive = globalController.offOn(Contribuable);