const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const District = require('./../model/districtModel');
const globalController = require('./globalController');

exports.checkData = (req, res, next) => {
    const {libelle_district} = req.body;

    if (!libelle_district) {
        return next(new AppError('Veillez fournir le nom du district!', 400));
    }
    next();
};

//Création d'un district
exports.createDistrict = globalController.createRow(District);

//Get all
exports.getAllDistrict = globalController.getAllRows(District);

//Get One
exports.getDistrict = globalController.getRow(District);

//Update one
exports.updateDistrict = globalController.updateRow(District);