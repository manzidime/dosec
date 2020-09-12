const mysql = require('mysql2');
const config = require('./../configuration/config');

const DB = mysql.createPool({
    connectionLimit: 1000,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
})
.promise();

module.exports = DB;
