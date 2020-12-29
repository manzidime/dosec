const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Article {
    constructor(data) {
        this.data = data;
    }

    //Creation
    async createOne() {
        try {
            const [rows] = await DB.query(`
                INSERT INTO article_budgetaire
                SET id_type_objet=?,
                    designation=?,
                    description=?
            `, [this.data.type,this.data.designation.toUpperCase(), this.data.description.toUpperCase()]);
            return rows.insertId;
        } catch (err) {
            throw err;
        }

    }

    //Obtenir tous
    async getAll(user) {
        try {
            let query
            if(user.administrer === 1){
                query=`
                    SELECT *
                    FROM v_all_article ORDER BY id_article DESC
                `
            }
            else{
                query=`
                    SELECT *
                    FROM v_all_article WHERE active='true' ORDER BY id_article DESC
                `
            }
            const [rows] = await DB.query(query);
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
                FROM article_budgetaire
                WHERE id_article_budgetaire = ?
            `, id);

            if (rows.length !== 1) {
                throw new AppError(`Aucun article trouvé avec l'id:${id}`, 403);
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
                    FROM article_budgetaire WHERE id_type_objet=?
                `,id);
            return rows;
        } catch (err) {
            throw err;
        }
    }

    //Update
    async updateOne(id) {
        try {
            const [rows] = await DB.query(`
                UPDATE article_budgetaire
                SET id_type_objet=?,designation=?,description=?
                WHERE id_article_budgetaire = ?
            `, [this.data.type,this.data.designation.toUpperCase(),this.data.description.toUpperCase(), id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun article trouvé avec l'id:${id}`, 403);
            }
            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }

    async desactiveOrActive(id) {
        try {
            const [rows] = await DB.query(`
                        UPDATE article_budgetaire
                        SET active=?
                        WHERE id_article_budgetaire = ?`,
                [this.data.active, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun article trouvé avec l'id:${id}`, 403);
            }
            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }
};