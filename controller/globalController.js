const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Notification = require('./../model/notificationModel')

//Create
exports.createRow = (Model)=> catchAsync(async (req, res, next) => {
    const newRow = await new Model(req.body).createOne();
    if(req.body.observationContribuable){
        await new Notification({
            titre:'Nouveau contribuable',
            description:'Nouvelle observation faite par l\'utilisateur',
            id_document:newRow,
            link:'/home/all-person'
        }).createOne()
    }
    res.status(201)
    .json({
        status: 'success',
        data: {
            newRow,
        },
    });

});

//get all
exports.getAllRows = (Model)=> catchAsync(async (req, res, next) => {
    const rows = await new Model().getAll(req.user);
    res.status(200)
    .json({
        status: 'success',
        results: rows.length,
        data: {
            rows,
        },
    });
});

//Get One
exports.getRow = Model=> catchAsync(async (req, res, next) => {
    const row = await new Model().getOne(req.params.id);
    res.status(200)
    .json({
        status: 'success',
        data: {
            row,
        },
    });
});

//Update one
exports.updateRow = Model=> catchAsync(async (req, res, next) => {
    const row = await new Model(req.body).updateOne(req.params.id);
    res.status(200)
    .json({
        status: 'success',
        data: {
            row,
        },
    });
});

//Disabled Or Actived
exports.offOn = Model=> catchAsync(async (req, res, next) => {
    const row = await new Model(req.body).desactiveOrActive(req.params.id);
    res.status(200)
    .json({
        status: 'success',
        data: {
            row,
        },
    });
});

//Get by other table
exports.getByOther = Model=> catchAsync(async (req, res, next) => {
    const rows = await new Model().getByOTherTable(req.params.id,req.user);
    res.status(200)
    .json({
        status: 'success',
        results: rows.length,
        data: {
            rows,
        },
    });
});