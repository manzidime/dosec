const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Categorie = require('./../model/categoryModel');
const globalController = require('./globalController');

//Get all
exports.getAllCategorie = globalController.getAllRows(Categorie);

//Get One
exports.getCategorie = globalController.getRow(Categorie);