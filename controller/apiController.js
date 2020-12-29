const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Api = require('./../model/apiModel');
const Taxation = require('./../model/taxationModel')
const globalController = require('./globalController');
const generate = require('meaningful-string');


exports.checkData = (req, res, next) => {
    const {nom, service, motif} = req.body;

    if(!req.body.cle){
        const options = {
            "min":20,
            "max":30,
            "capsWithNumbers":true
        }

        req.body.cle = generate.random(options)
    }

    if (!nom || !service || !motif) {
        return next(new AppError('Veillez remplir les champs nécessaire!', 400));
    }
    next();
};

//Création
exports.create = globalController.createRow(Api);

//Get all
exports.getAll = globalController.getAllRows(Api);

//Get by commune
exports.getOne= globalController.getRow(Api);

//Get One
exports.updateOne = globalController.updateRow(Api);

//Disable Or Active
exports.disableOrActive = globalController.offOn(Api);

//Data api
exports.dataApi = catchAsync(async(req,res,next)=>{
    if(!req.params.cle){
        next(new AppError('Veillez fournir votre clé de sécurité', 400))
    }

    await new Api().getOneByKey(req.params.cle)

    const data = await new Taxation().dataApi()

    res.status(200).json({
        status:'success',
        result:data.length,
        data:{
            data
        }
    })
})