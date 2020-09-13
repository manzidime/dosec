const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Vehicule = require('./../model/vehiculeModel');
const globalController = require('./globalController');

exports.getIdVehicules = (req, res, next) => {
    if (!req.body.id_agent) req.body.id_agent = req.user.id_agent;
    if (!req.body.id_site) req.body.id_site = req.user.id_site;
    next();
};

exports.checkData = (req, res, next) => {
    const {
              id_article_budgetaire, id_categorie, id_contribuable, numero_chassis, numero_plaque, model, marque, couleur,
              charge_utile, mise_en_circulation,
          } = req.body;

    if (!id_article_budgetaire || !id_categorie || !id_contribuable || !numero_chassis || !numero_plaque || !model ||
        !marque || !couleur || !charge_utile || !mise_en_circulation) {
        return next(new AppError('Veillez remplir tous champs!', 400));
    }

    next();
};

//Création d'un vehicule
exports.createVehicule = globalController.createRow(Vehicule);

//Get all
exports.getAllVehicule = globalController.getAllRows(Vehicule);

//Get One
exports.getVehicule = globalController.getRow(Vehicule);

//Update one
exports.updateContribuable = globalController.updateRow(Vehicule);

//Disable Or Active
exports.disableOrActive = globalController.offOn(Vehicule);

//
exports.getByOther = globalController.getByOther(Vehicule);