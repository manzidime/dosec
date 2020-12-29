const Fonction = require('./../model/fonctionModel');
const globalController = require('./globalController');

//Get all
exports.getAll = globalController.getAllRows(Fonction);