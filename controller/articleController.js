const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Article = require('./../model/articleModel');
const globalController = require('./globalController');

//Get all
exports.getAllArticle = globalController.getAllRows(Article);

//Get One
exports.getArticle = globalController.getRow(Article);

//Get by other table
exports.getOther = globalController.getByOther(Article);