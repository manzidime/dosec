const validator = require('validator');
const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Api {
    constructor(data) {
        this.data = data;
    }

    //1. Creation
    async createOne() {
        try {
            //1.Vérification format email
            if(!validator.isEmail(this.data.email)){
                throw new AppError(`Le format de cet email: ${this.data.email} n'est pas valide`,400)
            }

            //2. Vérification si l'email existe déjà
            const [email] = await DB.query(`SELECT email FROM api WHERE email=?`,this.data.email);

            if(email.length === 1){
                throw new AppError(`Cet email: ${this.data.email} est déjà utilisé, veillez fournir un autre`,400)
            }

            const [row] = await DB.query(
                    `INSERT INTO api
                     SET email=?,
                         nom=?,
                         service=?,
                         motif=?,
                         date_creation=current_timestamp(),
                         cle=?`, [this.data.email, this.data.nom, this.data.service, this.data.motif, this.data.cle]);
            return row.insertId;
        } catch (err) {
            throw err;
        }
    }

    //2. Obtenir tous
    async getAll() {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM api
                ORDER BY id_api DESC
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
                FROM api WHERE id_api=${id}
            `);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun compte trouvé avec l'id:${id}`, 403);
            }

            return rows;
        } catch (err) {
            throw err;
        }
    }

    async getOneByKey(cle) {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM api WHERE cle=?
            `,cle);

            if (rows.length !== 1) {
                throw new AppError(`Ce clé :${cle} n'est pas valide`, 403);
            }

            return rows;
        } catch (err) {
            throw err;
        }
    }

    //4. Obtenir tous
    async updateOne(id) {
        try {
            const [rows] = await DB.query(`
                UPDATE api SET
                         nom=?,
                         service=?,
                         motif=? WHERE id_api=${id}`, [this.data.nom, this.data.service, this.data.motif]);
            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun compte trouvé avec l'id:${id}`, 403);
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
                UPDATE api
                SET active=?
                WHERE id_api = ?
            `, [this.data.active, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun compte trouvé avec l'id:${id}`, 403);
            }
            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }
};