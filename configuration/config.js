const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});

module.exports = {
    database: process.env.DATABASE,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    jwt_cookie_expires_in: process.env.JWT_COOKIE_EXPIRES_IN,
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
};