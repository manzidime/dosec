const AppError = require('./../utils/appError');
const Vehicule = require('./../model/vehiculeModel');
const globalController = require('./globalController');
const catchAsync = require('./../utils/catchAsync');

exports.getIdVehicules = (req, res, next) => {
    if (!req.body.id_agent) req.body.id_agent = req.user.id_agent;
    if (!req.body.id_site) req.body.id_site = req.user.id_site;
    next();
};

exports.checkData = (req, res, next) => {

    //Obtention des variables
    const {
        id_article_budgetaire, id_categorie, id_contribuable,
        numero_chassis, numero_plaque, model, marque, couleur, charge_utile, mise_en_circulation, id_taxe
    } = req.body;

    //Conversion des ids en entier
    req.body.id_taxe = Number(req.body.id_taxe)
    req.body.id_article_budgetaire = Number(req.body.id_article_budgetaire)
    req.body.id_categorie = Number(req.body.id_categorie)
    req.body.id_contribuable = Number(req.body.id_contribuable)

    if (!id_taxe) {
        return next(new AppError('Veillez choisir la taxe', 400));
    }

    if (id_taxe === 15) {
        if (!id_article_budgetaire || !id_categorie || !id_contribuable || !numero_chassis || !numero_plaque ||
            !model || !marque || !couleur || !charge_utile || !mise_en_circulation) {
            return next(new AppError('Veillez remplir tous les champs obligatoire',400))
        }
    }
    else{
        if (!id_article_budgetaire || !id_categorie) {
            return next(new AppError('Veillez remplir tous les champs obligatoire',400))
        }
    }

    next()

};

//Get all car
exports.getAllCar = catchAsync(async (req, res, next) => {
    const vehicules = await new Vehicule().getAllCar(req.user,req.params);
    res.status(200).json({
        status: 'success',
        results: vehicules.length,
        data: {
            vehicules
        }
    });
});

//Liste des vehicules
exports.listVehicules = catchAsync(async (req, res, next) => {
    const vehicules = await new Vehicule().listeVehicules(req.user);

    res.status(200).json({
        status: 'success',
        results: vehicules.length,
        data: {
            vehicules
        }
    });
});

exports.proprieteNonVehicules = catchAsync(async (req, res, next) => {
    console.log(req.params)
    const vehicules = await new Vehicule().getAllOther(req.user,req.params);
    res.status(200).json({
        status: 'success',
        results: vehicules.length,
        data: {
            vehicules
        }
    });
});

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