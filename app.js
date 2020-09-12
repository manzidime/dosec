const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const userRouter = require('./router/userRouter');
const contribuableRouter = require('./router/contribuableRouter');
const vehiculeRouter = require('./router/vehiculeRouter');
const districtRouter = require('./router/districtRouter');
const communeRouter = require('./router/communeRouter');
const quartierRouter = require('./router/quartierRouter');
const articleRouter = require('./router/articleRouter');
const categorieRouter = require('./router/categorieRouter');
const taxationRouter = require('./router/taxationRouter');
const taxeRouter = require('./router/taxeRouter');
const typeRouter = require('./router/typeRouter');
const attestationRouter = require('./router/attestationRouter');
const viewRouter = require('./router/viewRouter');

const AppError = require('./utils/appError');
const handlerGlobalError = require('./controller/errorController');

//Express Application
const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//Router
app.use('/api/v1/users', userRouter);
app.use('/api/v1/contribuables', contribuableRouter);
app.use('/api/v1/vehicules', vehiculeRouter);
app.use('/api/v1/districts', districtRouter);
app.use('/api/v1/communes', communeRouter);
app.use('/api/v1/quartiers', quartierRouter);
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/categories', categorieRouter);
app.use('/api/v1/taxation', taxationRouter);
app.use('/api/v1/taxe', taxeRouter);
app.use('/api/v1/type-objet', typeRouter);
app.use('/api/v1/attestation', attestationRouter);
app.use('/', viewRouter);

//Error
app.use((req, res, next) => {
    next(new AppError(`Cet itinéraire:${req.originalUrl} n'existe pas`, 403));
});

app.use(handlerGlobalError);

//Export App
module.exports = app;