const app = require('./app');
const config = require('./configuration/config');

//Port
const port = config.port || 5000;

//Listen
app.listen(port, () => {
    console.log(`Nous écoutons sur le port:${port}`);
});