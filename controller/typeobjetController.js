const TypeObjet = require('./../model/typeObjetModel');
const globalController = require('./globalController');

//Get all
exports.getAll = globalController.getAllRows(TypeObjet);