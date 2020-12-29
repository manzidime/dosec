const AppError = require('./../utils/appError');
const Service = require('./../model/serviceModel');
const globalController = require('./globalController');

exports.checkData = (req, res, next) => {
    const {designation, ministere} = req.body;

    if (!designation || !ministere) {
        return next(new AppError('Veillez remplir les champs nécessaire!', 400));
    }
    next();
};

//Création
exports.create = globalController.createRow(Service);

//Get all
exports.getAll = globalController.getAllRows(Service);

//Get by commune
exports.getOne= globalController.getRow(Service);

//Get One
exports.updateOne = globalController.updateRow(Service);

//Disable Or Active
exports.disableOrActive = globalController.offOn(Service);