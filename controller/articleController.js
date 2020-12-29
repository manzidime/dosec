const Article = require('./../model/articleModel');
const globalController = require('./globalController');
const AppError = require('./../utils/appError')

exports.checkData = (req, res, next) => {
    const {type, designation,} = req.body;

    if (!type || !designation) {
        return next(new AppError('Les champs type et designation ne doivent pas être vide', 400));
    }
    next();
};

exports.createArticle = globalController.createRow(Article)

//Get all
exports.getAllArticle = globalController.getAllRows(Article);

//Get One
exports.getArticle = globalController.getRow(Article);
//Update
exports.updateArticle = globalController.updateRow(Article);
//State
exports.state = globalController.offOn(Article)
//Get by other table
exports.getOther = globalController.getByOther(Article);