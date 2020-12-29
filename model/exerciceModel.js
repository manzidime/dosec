const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Exercice {
    constructor(data) {
        this.data = data;
    }

    //Obtenir tous
    async getAll() {
        try {
            const [rows] = await DB.query(`
                    SELECT *
                    FROM exercice
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
                FROM exercice
                WHERE id_exercice = ?
            `, id);

            if (rows.length !== 1) {
                throw new AppError(`Aucun exercice trouvé avec l'id:${id}`, 403);
            }
            return rows[0];
        } catch (err) {
            throw err;
        }

    }
};