const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../model/userModel');
const config = require('./../configuration/config');

const signToken = (id) => {
    return jwt.sign({id: id}, config.jwt_secret, {
        expiresIn: config.jwt_expires_in,
    });
};

//!sauvegarde du token dans la cookie
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user[0].id_agent);
    const cookieOptions = {
        expires: new Date(Date.now() + config.jwt_cookie_expires_in * 24 * 60 * 60 * 100),
        httpOnly: true,
    };
    if (config.node_env === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode)
    .json({
        status: 'success',
        token,
    });
};

//!Login
exports.login = catchAsync(async (req, res, next) => {
    const {login, password} = req.body;

    //1. Verifier si le login et password existe
    if (!login || !password) {
        next(new AppError('Veillez fournir votre login et mot de passe', 400));
    }

    //2. Vérifier si l'utilisateur existe et le password est correct
    const user = await new User().getOneByLogin(login);
    if (user.length !== 1 || (!await new User().comparePassword(password, user[0].password))) {
        next(new AppError('Mot de passe ou login est incorrect', 400));
    }

    //3. Envoin du token
    createSendToken(user,200,res)
});

//!Logout
exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200)
    .json({status: 'success'});
};

//!Protection des ressources
exports.protect = catchAsync(async (req, res, next) => {
    let token;

    //1. Verifier si le toke existe
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if(req.cookies.jwt){
        token = req.cookies.jwt
    }

    if (!token) {
        return next(new AppError(`Vous n'êtes pas connectés, veillez vous connecter`, 404));
    }
    //2. Vérifier si le token est authentique
    const decoded = await promisify(jwt.verify)(token, config.jwt_secret);

    if (!decoded) {
        return next(new AppError('Votre token n\'est pas authentique'));
    }

    //3. Vérifier si l'utilisateur existe toujours
    const user = await new User().getOne(decoded.id);

    req.user = user[0];
    res.locals.user = user[0];
    next();

});