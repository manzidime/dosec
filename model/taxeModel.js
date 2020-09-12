const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Taxe {
    constructor(data) {
        this.data = data;
    }

    //Get all car
    async getAll() {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM taxe
            `);

            return rows;
        } catch (err) {
            throw err;
        }

    };

    //Get district
    async getOne(id) {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM taxe
                WHERE id_taxe = ?
            `, id);

            if (rows.length !== 1) {
                throw new AppError(`Aucune taxe trouvée avec l'id:${id}`, 403);
            }
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    async getByOTherTable(id){
        try {
            const [rows] = await DB.query(`
                    SELECT *
                    FROM taxe WHERE id_type_objet=?
                `,id);
            return rows;
        } catch (err) {
            throw err;
        }
    }
};