const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

//Create
exports.createRow = (Model)=> catchAsync(async (req, res, next) => {

    const newRow = await new Model(req.body).createOne();

    res.status(201)
    .json({
        status: 'success',
        data: {
            newRow,
        },

    });

});

//Get all
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

//Disable Or Active
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
    const rows = await new Model().getByOTherTable(req.params.id);

    res.status(200)
    .json({
        status: 'success',
        results: rows.length,
        data: {
            rows,
        },
    });


});