const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Service {
    constructor(data) {
        this.data = data;
    }

    //1. Creation
    async createOne() {
        try {
            const [row] = await DB.query(
                    `INSERT INTO service_assiette
                     SET designation=?,
                         ministere=?,
                         description=?`,
                [this.data.designation.toUpperCase(), this.data.ministere.toUpperCase(), this.data.description]);

            return row.insertId;
        } catch (err) {
            throw err;
        }
    }

    //2. Obtenir tous
    async getAll(user) {
        try {
            let query
            if(user.administrer===1){
                query = `
                SELECT *
                FROM service_assiette ORDER BY id_serviceAssiette DESC
            `
            }
            else{
                query = `
                SELECT *
                FROM service_assiette WHERE active='true' AND id_serviceAssiette=${user.id_serviceAssiette} ORDER BY id_serviceAssiette DESC`
            }
            const [rows] = await DB.query(query);
            return rows;
        } catch (err) {
            throw err;
        }

    }

    //3. Get one
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

    //4. Update
    async updateOne(id) {
        try {
            const [rows] = await DB.query(`
                        UPDATE service_assiette
                        SET designation=?,
                            ministere=?,
                            description=?
                        WHERE id_serviceAssiette = ?`,
                [this.data.designation.toUpperCase(), this.data.ministere.toUpperCase(), this.data.description,
                    id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun service trouvé avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }

    //5. state
    async desactiveOrActive(id) {
        try {
            const [rows] = await DB.query(`
                UPDATE service_assiette
                SET active=?
                WHERE id_serviceAssiette = ?
            `, [this.data.active, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun service trouvé avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    };
}
;