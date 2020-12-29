const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/appError')
const Taux = require('./../model/tauxModel');
const globalController = require('./globalController');

exports.checkData = (req, res, next) => {
    const {valeur} = req.body;

    if (!valeur) {
        return next(new AppError('Veillez renseigner la valeur du taux!', 400));
    }
    next();
};

//create one
exports.createOne = globalController.createRow(Taux)
//Get all
exports.getAll = globalController.getAllRows(Taux);