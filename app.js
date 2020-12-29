const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const pdfRenderer = require('@ministryofjustice/express-template-to-pdf');
pdf = require('express-pdf');

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
const siteRouter = require('./router/siteRouter');
const fonctionRouter = require('./router/fonctionRouter');
const serviceRouter = require('./router/serviceRouter');
const tarifRouter = require('./router/tarifRouter');
const exerciceRouter = require('./router/exerciceRouter');
const apiRouter = require('./router/apiRouter');
const tauxRouter = require('./router/tauxRouter');
const notificationRouter = require('./router/notificationRouter');

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
app.use(pdfRenderer());
app.use(pdf);

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
app.use('/api/v1/sites', siteRouter);
app.use('/api/v1/fonctions', fonctionRouter)
app.use('/api/v1/services', serviceRouter)
app.use('/api/v1/tarif', tarifRouter)
app.use('/api/v1/exercices', exerciceRouter)
app.use('/api/v1/api', apiRouter)
app.use('/api/v1/taux', tauxRouter)
app.use('/api/v1/notification', notificationRouter)
app.use('/', viewRouter);

//Error
app.use((req, res, next) => {
    next(new AppError(`Cet itinéraire:${req.originalUrl} n'existe pas`, 403));
});

app.use(handlerGlobalError);

//Export App
module.exports = app;