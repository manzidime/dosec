const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class TypeObjet {
    constructor(data) {
        this.data = data;
    }

    //Get all car
    async getAll() {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM type_objet
            `);

            return rows;
        } catch (err) {
            throw err;
        }

    };
};