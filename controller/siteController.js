const AppError = require('./../utils/appError');
const Site = require('./../model/siteModel');
const globalController = require('./globalController');

exports.checkData = (req, res, next) => {
    const {province, id_commune, lieu, code,operation} = req.body;

    if (!province || !id_commune || !lieu || !code || !operation) {
        return next(new AppError('Veillez remplir les champs nécessaire!', 400));
    }
    next();
};

//Création
exports.create = globalController.createRow(Site);

//Get all
exports.getAll = globalController.getAllRows(Site);

//Get by commune
exports.getOne= globalController.getRow(Site);

//Get One
exports.updateOne = globalController.updateRow(Site);

//Disable Or Active
exports.disableOrActive = globalController.offOn(Site);