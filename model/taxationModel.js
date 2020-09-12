const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Taxation {
    constructor(data) {
        this.data = data;
    }

    //Creation
    async createOne() {
        try {

            //1. Définition du montant
            const [car] = await DB.query(`
                SELECT *
                FROM vehicule
                WHERE id_vehicule = ?
            `, this.data.id_vehicule);

            if (car.length !== 1) {
                throw new AppError('Problème avec le vehicule, veillez contacter l\'administrateur', 403);
            }

            const res = car[0];

            const [montant] = await DB.query(`
                    SELECT montant, code_taxe,exercice,devise FROM v_all_tarif WHERE id_taxe=${res.id_taxe} AND id_categorie=${res.id_categorie} AND id_article_budgetaire=${res.id_article_budgetaire}
                `);

            //2. Définition du taux
            const [taux] = await DB.query(`SELECT valeur, date
                                           FROM taux
                                           ORDER BY date DESC
                                           LIMIT 1`);
            if (taux.length !== 1) {
                throw new AppError('Problème avec le taux, veillez contacter l\'administrateur', 403);
            }

            const vTaux = taux[0];

            //3. Insertion de la taxation
            const [rows] = await DB.query(`
                INSERT INTO taxation
                SET taux=?,
                    id_contribuable=?,
                    montant=?,
                    devise=?,
                    id_exercice=?,
                    id_taxe=?,
                    id_site=?,
                    nom_receptionniste=?,
                    telephone_receptioniste=?,
                    date_taxation=current_timestamp(),
                    id_agent=?,
                    id_vehicule=?,
                    date_creation=current_timestamp()
            `, [vTaux.valeur, this.data.id_contribuable, montant.length !== 0 ? montant[0].montant : null,
                montant.length !== 0 ? montant[0].devise : null, this.data.id_exercice, this.data.id_taxe,
                this.data.id_site, this.data.nom_receptionniste,
                this.data.telephone_receptioniste, this.data.id_agent,
                this.data.id_vehicule]);

            //4. Definition du numero taxation
            const lastIdTaxation = rows.insertId;
            const count = 1000 + lastIdTaxation;
            const numTaxation = montant.length === 1 ?
                `${count}/${montant[0].code_taxe}/${montant[0].exercice}` : null;
            await DB.query(`UPDATE taxation SET num_taxation='${numTaxation}' WHERE id_taxation=${lastIdTaxation}`);

            return rows;

        } catch (err) {
            throw err;
        }

    }

    //Obtenir tous
    async getAll(user) {
        try {
            let query;
            if (user.id_fonction === 1) {
                query = `
                    SELECT *
                    FROM v_all_taxation
                    WHERE active = 'true'
                      AND state = 'tax'
                `;
            }
            else {
                query = `
                    SELECT *
                    FROM v_all_taxation
                    WHERE id_site = ?
                      AND active = 'true'
                      AND state = 'tax'
                `;
            }

            const [rows] = await DB.query(query, user.id_site);

            return rows;
        } catch (err) {
            throw err;
        }

    }

    //Ger all taxation valide
    async getValide(user) {
        try {
            let query;
            if (user.id_fonction === 1) {
                query = `
                    SELECT *
                    FROM v_all_taxation
                    WHERE active = 'true'
                      AND state = 'ord'
                `;
            }
            else {
                query = `
                    SELECT *
                    FROM v_all_taxation
                    WHERE id_site = ?
                      AND active = 'true'
                      AND state = 'ord'
                `;
            }

            const [rows] = await DB.query(query, user.id_site);

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
                FROM v_all_taxation
                WHERE id_taxation = ?
            `, id);

            if (rows.length !== 1) {
                throw new AppError(`Aucune taxation trouvée avec l'id:${id}`, 403);
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
                UPDATE taxation
                SET id_taxe=?,
                    nom_receptionniste=?,
                    telephone_receptioniste=?,
                    id_vehicule=?,
                    id_contribuable=?
                WHERE id_taxation = ?`, [this.data.id_taxe, this.data.nom_receptionniste,
                this.data.telephone_receptioniste, this.data.id_vehicule, this.data.id_contribuable, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucune taxation trouvée avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }

    }

    //desable one
    async desactiveOrActive(id) {
        try {
            const [rows] = await DB.query(`
                UPDATE taxation
                SET active=?
                WHERE id_taxation = ?
            `, [this.data.active, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucune taxation trouvée avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }

    //Activate taxation
    async validateTaxation(id) {
        try {
            const [ord] = await DB.query(`SELECT id_taxation, state
                                          FROM taxation
                                          WHERE id_taxation = ?
                                            AND state = 'ord'`, id);
            if (ord.length === 1) {
                throw new AppError('Cette taxation est déjà validée!', 400);
            }

            const [rows] = await DB.query(`
                        UPDATE taxation
                        SET id_compte=?,
                            avis=?,
                            id_validateur=?,
                            state='ord',
                            date_validation=current_timestamp()
                        WHERE id_taxation = ?`,
                [this.data.id_compte, this.data.avis, this.data.id_validateur,
                    id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucune taxation trouvée avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }

    }
};