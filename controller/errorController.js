const config = require('./../configuration/config');

const AppError = require('./../utils/appError');


const handleCastErrorDB = err => {
    const message = `Invalide ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const errorConnexionDB = ()=>{
    const message = 'Problème avec le serveur de Mysql'
    return new AppError(message, 400)
}

const badField = err => {
    const message = `${err.message} kkkkk`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors)
    .map(el => el.message);

    const message = `Donnée invalide. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const handleJWTError = () =>
    new AppError('Token invalide. Veuillez vous connecter encore!', 401);

const handleJWTExpiredError = () =>
    new AppError('Votre token est expiré! Veuillez vous connecter encore.', 401);

const sendErrorDev = (err, req, res) => {
    // A) API
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode)
        .json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }

    // B) RENDERED WEBSITE
    console.error('ERROR 💥', err);
    return res.status(err.statusCode)
    .render('error', {
        title: 'Quelque chose ne fonctionne pas!',
        msg: err.message,
    });
};

const sendErrorProd = (err, req, res) => {
    // A) API
    if (req.originalUrl.startsWith('/api')) {
        // A) Operational, trusted error: send message to client
        if (err.isOperational) {
            return res.status(err.statusCode)
            .json({
                status: err.status,
                message: err.message,
            });
        }
        // B) Programming or other unknown error: don't leak error details
        // 1) Log error
        console.error('ERROR 💥', err);
        // 2) Send generic message
        return res.status(500)
        .json({
            status: 'error',
            message: 'Quelque chose ne fonctionne pas!',
        });
    }

    // B) RENDERED WEBSITE
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
        return res.status(err.statusCode)
        .render('error', {
            title: 'Quelque chose ne fonctionne pas!',
            msg: err.message,
        });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(err.statusCode)
    .render('error', {
        title: 'Quelque chose ne fonctionne pas!',
        msg: 'Veuillez ressayer plutard.',
    });
};

module.exports = (err, req, res, next) => {
    console.log(err.stack);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (config.node_env === 'development') {
        let error = {...err};
        error.message = err.message;

        if(error.code === 'ECONNREFUSED') error = errorConnexionDB()

        sendErrorDev(error, req, res);
    }
    if (config.node_env === 'production') {
        let error = {...err};
        error.message = err.message;

        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

        sendErrorProd(error, req, res);
    }
};
