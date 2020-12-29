const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Categorie {
    constructor(data) {
        this.data = data;
    }

    // //Creation
    // async createOne() {
    //     try {
    //         const [rows] = await DB.query(`
    //             INSERT INTO commune
    //             SET libelle_commune=?,
    //                 id_district=?
    //         `, [this.data.libelle_commune,this.data.id_district]);
    //         return rows;
    //     } catch (err) {
    //         throw err;
    //     }
    //
    // }

    //Obtenir tous
    async getAll() {
        try {
            const [rows] = await DB.query(`
                    SELECT *
                    FROM categorie
                `);
            return rows;
        } catch (err) {
            throw err;
        }

    }

    //Get one
    async getOne(id) {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM categorie
                WHERE id_categorie = ?
            `, id);

            if (rows.length !== 1) {
                throw new AppError(`Aucune categorie trouvée avec l'id:${id}`, 403);
            }
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    //Update
    // async updateOne(id) {
    //     try {
    //         const [rows] = await DB.query(`
    //             UPDATE commune
    //             SET libelle_commune=?,id_district=?
    //             WHERE id_commune = ?
    //         `, [this.data.libelle_commune,this.data.id_district, id]);
    //
    //         if (rows.affectedRows !== 1) {
    //             throw new AppError(`Aucune commune trouvé avec l'id:${id}`, 403);
    //         }
    //         return rows.affectedRows;
    //     } catch (err) {
    //         throw err;
    //     }
    // }
};