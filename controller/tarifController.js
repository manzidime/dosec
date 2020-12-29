const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Tarif = require('./../model/tarifModel');
const globalController = require('./globalController');

exports.checkData = (req, res, next) => {
    const {id_taxe,id_categorie, id_article_budgetaire, exercice, echeance, montant, devise} = req.body;

    if (!id_taxe || !id_categorie || !id_article_budgetaire || !exercice || !echeance || !montant || !devise) {
        return next(new AppError('Veillez remplir les champs nécessaire!', 400));
    }
    next();
};

exports.tarifTaxation = catchAsync(async(req,res,next)=>{
    const tarif = await new Tarif().tarifTaxation(req.params)
    res.status(200).json({
        status:'success',
        data:{
            tarif
        }
    })
})

//Création
exports.create = globalController.createRow(Tarif);

//Get all
exports.getAll = globalController.getAllRows(Tarif);

//Get one
exports.getOne= globalController.getRow(Tarif);

//Update
exports.updateOne = globalController.updateRow(Tarif);

//Disable Or Active
exports.disableOrActive = globalController.offOn(Tarif);