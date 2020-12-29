const Exercice = require('./../model/exerciceModel');
const globalController = require('./globalController');

//Get all
exports.getAll = globalController.getAllRows(Exercice);

//Get One
exports.getOne = globalController.getRow(Exercice);