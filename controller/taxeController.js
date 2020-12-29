const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Taxe = require('./../model/taxeModel');
const globalController = require('./globalController');

exports.checkData = (req, res, next) => {
    const {type, service, designation, description,} = req.body;

    if (!type || !service || !designation || !description) {
        return next(new AppError('Veillez remplir tous champs!', 400));
    }
    next();
};

//create one
exports.createOne = globalController.createRow(Taxe)

//update
exports.updateOne = globalController.updateRow(Taxe)
exports.state = globalController.offOn(Taxe)

//Get all
exports.getAll = globalController.getAllRows(Taxe);

//Get one
exports.getOne = globalController.getRow(Taxe);

//Get Other
exports.getOther = globalController.getByOther(Taxe)