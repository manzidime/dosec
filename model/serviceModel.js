const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Service {
    constructor(data) {
        this.data = data;
    }

    //Obtenir tous
    async getAll() {
        try {
            const [rows] = await DB.query(`
                    SELECT *
                    FROM service_assiette
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
                FROM service_assiette
                WHERE id_serviceAssiette = ?
            `, id);

            if (rows.length !== 1) {
                throw new AppError(`Aucun service trouvé avec l'id:${id}`, 403);
            }
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

};