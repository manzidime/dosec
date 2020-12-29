const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Quartier = require('./../model/quartierModel');
const globalController = require('./globalController');

exports.checkData = (req, res, next) => {
    const {libelle_quartier, id_commune} = req.body;

    if (!libelle_quartier || !id_commune) {
        return next(new AppError('Veillez remplir les champs nécessaire!', 400));
    }

    next();
};

//Création
exports.createQuartier = globalController.createRow(Quartier);

//Get all
exports.getAllQuartier = globalController.getAllRows(Quartier);

//Get by commune
exports.getByCommune = globalController.getByOther(Quartier);

//Get One
exports.getQuartier = globalController.getRow(Quartier);

//Update one
exports.updateQuartier = globalController.updateRow(Quartier);