const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Fonction {
    constructor(data) {
        this.data = data;
    }

    //Obtenir tous
    async getAll() {
        try {
            const [rows] = await DB.query(`
                    SELECT *
                    FROM fonction
                    `);
            return rows;
        } catch (err) {
            throw err;
        }

    }
};