const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Taux {
    constructor(data) {
        this.data = data;
    }

    async createOne() {
        try {
            const [taux] = await DB.query(
                `INSERT INTO taux SET valeur=?,date=current_timestamp`,[this.data.valeur.toUpperCase()]);
            return taux.insertId;
        } catch (err) {
            throw err;
        }
    };

    //Get all car
    async getAll() {
        try {
            const [taux] = await DB.query(
                    `SELECT *
                     FROM v_all_taux
                     ORDER BY id DESC`);

            return taux;
        } catch (err) {
            throw err;
        }

    };

    //Get taux current
    async getTauxCurent() {
        try {
            const [taux] = await DB.query(
                    `SELECT valeur, date,devise
                     FROM taux
                     ORDER BY idtaux DESC
                     LIMIT 1`);

            return taux;
        } catch (err) {
            throw err;
        }
    };

};