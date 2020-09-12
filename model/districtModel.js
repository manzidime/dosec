const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class District {
    constructor(data) {
        this.data = data;
    }

    //Creation d'un district
    async createOne() {
        try {
            const [rows] = await DB.query(`
                INSERT INTO district
                SET libelle_district=?
            `, [this.data.libelle_district]);
            return rows;
        } catch (err) {
            throw err;
        }

    }

    //Obtenir tous
    async getAll() {
        try {
            const [rows] = await DB.query(`
                    SELECT *
                    FROM district
                `);
            return rows;
        } catch (err) {
            throw err;
        }

    }

    //Get district
    async getOne(id) {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM district
                WHERE id_district = ?
            `, id);

            if (rows.length !== 1) {
                throw new AppError(`Aucun district trouvé avec l'id:${id}`, 403);
            }
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    //Update
    async updateOne(id) {
        try {
            const [rows] = await DB.query(`
                UPDATE district
                SET libelle_district=?
                WHERE id_district = ?
            `, [this.data.libelle_district, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun district trouvé avec l'id:${id}`, 403);
            }
            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }
};