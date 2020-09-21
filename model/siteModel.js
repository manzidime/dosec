const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Site {
    constructor(data) {
        this.data = data;
    }

    //Obtenir tous
    async getAll() {
        try {
            const [rows] = await DB.query(`
                    SELECT *
                    FROM v_all_site
                    `);
            return rows;
        } catch (err) {
            throw err;
        }

    }
};