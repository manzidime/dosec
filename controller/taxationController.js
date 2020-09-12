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
    const {id_exercice, id_taxe, id_site, nom_receptionniste, telephone_receptioniste, id_vehicule} = req.body;

    if (!id_exercice || !id_taxe || !id_site || !nom_receptionniste || !telephone_receptioniste || !id_vehicule) {
        return next(new AppError('Veillez remplir tous champs!', 400));
    }
    next();
};

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