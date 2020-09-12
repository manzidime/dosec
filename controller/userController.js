const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../model/userModel');
const globalController = require('./globalController');

exports.checkData = (req, res, next) => {
    const {nom, prenom, matricule, sexe, id_fonction, password, id_site} = req.body;

    //1. Vérification des champs importants
    if (!nom || !prenom || !matricule || !sexe || !id_fonction || !password || !id_site) {
        next(new AppError('Veillez remplir tous les champs importants', 400));
    }

    next();
};

//All Users
exports.getAllUser = globalController.getAllRows(User);

//Get a User
exports.getUser = globalController.getRow(User);

//Insert user
exports.createUser = globalController.createRow(User);

//Update a User
exports.updateUser = globalController.updateRow(User);

//Desable Or Active a User
exports.activeOrDisable = globalController.offOn(User);

//Update me:password
exports.changeMePassword = catchAsync(async (req, res, next) => {
    const {oldPassword, password, passwordConfirm} = req.body;

    if (!oldPassword || !password || !passwordConfirm) {
        next(new AppError('Veillez remplir tous les champs', 400));
    }

    const user = await new User({
        oldPassword: req.body.oldPassword,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    }).updateMePassword(req.user);

    res.status(200)
    .json({
        status: 'success',
        data: {
            user,
        },
    });
});