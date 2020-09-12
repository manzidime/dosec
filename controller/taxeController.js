const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Taxe = require('./../model/taxeModel');
const globalController = require('./globalController');

//Get all
exports.getAll = globalController.getAllRows(Taxe);

//Get one
exports.getOne = globalController.getRow(Taxe);

//Get Other
exports.getOther = globalController.getByOther(Taxe)