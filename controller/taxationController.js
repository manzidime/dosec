const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Taxation = require('./../model/taxationModel');
const globalController = require('./globalController');

//Get id from user
exports.getIdUser = (req, res, next) => {
    if (!req.body.id_site) req.body.id_site = req.user.id_site;
    if (!req.body.id_agent) req.body.id_agent = req.user.id_agent;
    if (!req.body.id_validateur) req.body.id_validateur = req.user.id_agent;
    next();
};

exports.checkData = (req, res, next) => {
    const {exercice, id_taxe, nom_declarant, telephone_declarant} = req.body;

    if (!exercice || !id_taxe || !nom_declarant || !telephone_declarant) {
        return next(new AppError('Veillez remplir tous champs!', 400));
    }
    next();
};

//All vehicules from taxation
exports.getAllVehiculesTaxation = catchAsync(async (req, res, next) => {
    const all = await new Taxation().getAllVehiculesTaxation(req.params.id);

    res.status(200)
        .json({
            status: 'success',
            results: all.length,
            data: {
                all,
            },
        });
});

//All notes
exports.notes = catchAsync(async (req, res, next) => {
    const notes = await new Taxation().note(req.user);
    res.status(200).json({
        status: 'success',
        results: notes.length,
        data: {
            notes
        }
    });
});

//Validate taxation
exports.validateTaxation = catchAsync(async (req, res, next) => {
    const validation = await new Taxation(req.body).validateTaxation(req.params.id);
    res.status(200)
        .json({
            status: 'success',
            data: {
                validation,
            },
        });
});

//Get all taxation valideted
exports.getAllValide = catchAsync(async (req, res, next) => {
    const taxationValide = await new Taxation().getValide(req.user);
    res.status(200)
        .json({
            status: 'success',
            results: taxationValide.length,
            data: {
                taxationValide,
            },
        });
});

//Créate
exports.create = globalController.createRow(Taxation);

//Get all
exports.getAll = globalController.getAllRows(Taxation);

//Get One
exports.get = globalController.getRow(Taxation);

//Update one
exports.update = globalController.updateRow(Taxation);

//Disable Or Active
exports.disableOrActive = globalController.offOn(Taxation);

//Obtenir les prix
exports.getTarrif = catchAsync(async (req, res, next) => {
    const montant = await new Taxation().getAllTarrif(req.body);
    res.status(200).json({
        status: 'success',
        data: {
            montant
        }
    });
});