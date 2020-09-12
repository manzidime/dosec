const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Commune = require('./../model/communeModel');
const globalController = require('./globalController');

exports.checkDataCommune = (req, res, next) => {
    const {libelle_commune, id_district} = req.body;

    if (!libelle_commune || !id_district) {
        return next(new AppError('Veillez remplir les champs nécessaire!', 400));
    }

    next();
};

//Get all commune by district
exports.getByDistrict = globalController.getByOther(Commune);

//Création
exports.createCommune = globalController.createRow(Commune);

//Get all
exports.getAllCommune = globalController.getAllRows(Commune);

//Get One
exports.getCommune = globalController.getRow(Commune);

//Update one
exports.updateCommune = globalController.updateRow(Commune);