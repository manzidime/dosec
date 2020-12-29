const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Site {
    constructor(data) {
        this.data = data;
    }

    //1. Creation
    async createOne() {
        try {
            const [row] = await DB.query(
                    `INSERT INTO site
                     SET province=?,
                         id_commune=?,
                         lieu=?,
                         code=?,operation=?`, [this.data.province.toUpperCase(), this.data.id_commune, this.data.lieu.toUpperCase(), this.data.code, this.data.operation]);

            return row.insertId
        } catch (err) {
            throw err
        }
    }

    //2. Obtenir tous
    async getAll() {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM v_all_site ORDER BY id DESC
            `);
            return rows;
        } catch (err) {
            throw err;
        }
    }

    //3. Obtenir tous
    async getOne(id) {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM v_all_site WHERE id=${id}
            `);
            return rows;
        } catch (err) {
            throw err;
        }
    }

    //4. Obtenir tous
    async updateOne(id) {
        try {
            const [rows] = await DB.query(`
                UPDATE site SET
                         province=?,       
                         id_commune=?,
                         lieu=?,
                         code=?,operation=? WHERE id=${id}
            `, [this.data.province.toUpperCase(),this.data.id_commune, this.data.lieu, this.data.code,this.data.operation]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun site trouvé avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }

    //5. disable or active
    async desactiveOrActive(id) {
        try {
            const [rows] = await DB.query(`
                UPDATE site
                SET active=?
                WHERE id = ?
            `, [this.data.active, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun site trouvé avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }
};