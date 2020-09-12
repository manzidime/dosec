const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Commune {
    constructor(data) {
        this.data = data;
    }

    //Creation
    async createOne() {
        try {
            const [rows] = await DB.query(`
                INSERT INTO commune
                SET libelle_commune=?,
                    id_district=?
            `, [this.data.libelle_commune,this.data.id_district]);
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
                    FROM v_all_commune
                `);
            return rows;
        } catch (err) {
            throw err;
        }

    }

    async getByOTherTable(id){
        try {
            const [rows] = await DB.query(`
                    SELECT *
                    FROM v_all_commune WHERE id_district=?
                `,id);
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
                FROM v_all_commune
                WHERE id_commune = ?
            `, id);

            if (rows.length !== 1) {
                throw new AppError(`Aucune commune trouvé avec l'id:${id}`, 403);
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
                UPDATE commune
                SET libelle_commune=?,id_district=?
                WHERE id_commune = ?
            `, [this.data.libelle_commune,this.data.id_district, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucune commune trouvé avec l'id:${id}`, 403);
            }
            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }
};