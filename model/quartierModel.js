const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Quartier {
    constructor(data) {
        this.data = data;
    }

    //Creation
    async createOne() {
        try {
            const [rows] = await DB.query(`
                INSERT INTO quartier
                SET libelle_quartier=?,
                    id_commune=?
            `, [this.data.libelle_quartier,this.data.id_commune]);
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
                    FROM v_all_quartier
                `);
            return rows;
        } catch (err) {
            throw err;
        }

    }

    //Get quartier by commune
    async getByOTherTable(id){
        try {
            const [rows] = await DB.query(`
                    SELECT *
                    FROM v_all_quartier WHERE id_commune=?
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
                FROM quartier
                WHERE id_quartier = ?
            `, id);

            if (rows.length !== 1) {
                throw new AppError(`Aucun quartier trouvé avec l'id:${id}`, 403);
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
                UPDATE quartier
                SET libelle_quartier=?=?,id_commune=?
                WHERE id_quartier = ?
            `, [this.data.libelle_quartier,this.data.id_commune, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun quartier trouvé avec l'id:${id}`, 403);
            }
            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }
};