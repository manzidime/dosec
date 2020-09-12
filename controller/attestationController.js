const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Attestation = require('./../model/attestationModel');
const globalController = require('./globalController');

//Get id from user
exports.getIdUser = (req, res, next) => {
    if (!req.body.id_site) req.body.id_site = req.user.id_site;
    if (!req.body.id_agent) req.body.id_agent = req.user.id_agent;
    next();
};

exports.checkData = (req, res, next) => {
    const {date_attestation, numero_bordereau, id_taxation, montant, montant_global} = req.body;

    if (!date_attestation || !numero_bordereau || !id_taxation || !montant || !montant_global) {
        return next(new AppError('Veillez remplir tous champs!', 400));
    }

    next();
};


//Création d'un contribuable
exports.createOne = globalController.createRow(Attestation);

//Get all
exports.getAll = globalController.getAllRows(Attestation);

//Get One
exports.getOne = globalController.getRow(Attestation);

//Update one
exports.updateOne = globalController.updateRow(Attestation);

//Disable Or Active
exports.disableOrActive = globalController.offOn(Attestation);