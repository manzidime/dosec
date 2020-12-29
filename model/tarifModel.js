const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Tarif {
    constructor(data) {
        this.data = data;
    }

    //1. Creation
    async createOne() {
        try {
            const [row] = await DB.query(
                    `INSERT INTO tarif
                     SET id_taxe=?,
                         id_categorie=?,
                         id_article_budgetaire=?,
                         exercice=?,
                         echeance=?,
                         montant=?,
                         devise=?`,
                [this.data.id_taxe, this.data.id_categorie, this.data.id_article_budgetaire, this.data.exercice, this.data.echeance,
                    this.data.montant, this.data.devise.toUpperCase()]);

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
                FROM v_all_tarif
                ORDER BY id_tarif DESC`);

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
                FROM v_all_tarif
                WHERE id_tarif = ?
            `, id);

            if (rows.length !== 1) {
                throw new AppError(`Aucun tarif trouvé avec l 'id:${id}`, 403);
            }
            return rows[0];
        } catch (err) {
            throw err;
        }

    };

    //3. Get for taxation
    async tarifTaxation(params) {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM v_all_tarif
                WHERE id_taxe = ? AND id_article_budgetaire=? AND id_categorie=? AND echeance=?
            `,[params.taxe,params.article,params.categorie,params.echeance]);

            // if (rows.length !== 1) {
            //     throw new AppError(`Aucun tarif trouvé`, 403);
            // }
            return rows[0];
        } catch (err) {
            throw err;
        }
    };

//4. Update
    async updateOne(id) {
        try {
            const [rows] = await DB.query(`
                        UPDATE tarif
                        SET id_categorie=?,
                            id_article_budgetaire=?,
                            exercice=?,
                            echeance=?,
                            montant=?,
                            devise=?
                        WHERE idTarif = ?`,
                [this.data.id_categorie, this.data.id_article_budgetaire, this.data.exercice, this.data.echeance,
                    this.data.montant, this.data.devise, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun tarif trouvé avec l'id:${id}`, 403);
            }
            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }

//5. state
    async desactiveOrActive(id) {
        try {
            const [rows] = await DB.query(
                    `UPDATE tarif
                     SET active=?
                     WHERE idTarif = ?`, [this.data.active, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun tarif trouvé avec l'id:${id}`, 403);
            }
            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }
}