const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Taxation {
    constructor(data) {
        this.data = data;
    }

    async insert(nbActe, globalSum, other, taux) {
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
                nom_declarant=?,
                telephone_declarant=?,
                date_taxation=current_timestamp(),
                id_agent=?,
                nombre_acte=?,
                date_creation=current_timestamp()
        `, [taux.valeur, this.data.id_contribuable, globalSum,
            other.devise, this.data.id_exercice, this.data.id_taxe,
            this.data.id_site, this.data.nom_declarant,
            this.data.telephone_declarant, this.data.id_agent, nbActe]);

        //4. Definition du numero taxation
        const lastIdTaxation = rows.insertId;
        const count = 1000 + lastIdTaxation;
        const numTaxation = `${count}/${other.code_taxe}/${other.exercice}`;

        await DB.query(`UPDATE taxation SET num_taxation='${numTaxation}' WHERE id_taxation=${lastIdTaxation}`);

        return rows;
    }

    //Creation
    async createOne() {
        try {

            /**********************************************************************
             * BLOCK 1 : s'il y a plusieurs vehicules
             * */

            //1. Définition du montant
            if (this.data.id_vehicule.length > 1) {
                const vehicules = this.data.id_vehicule.map(async (el) => {
                    const [vehicule] = await DB.query(`
                        SELECT *
                        FROM vehicule
                        WHERE id_vehicule = ?
                    `, el);

                    if (this.data.id_taxe == 15) {
                        try {
                            const [montant] = await DB.query(
                                `SELECT montant, code_taxe,exercice,devise
                                 FROM v_all_tarif
                                 WHERE id_taxe=? 
                                   AND id_categorie=${vehicule[0].id_categorie} 
                                   AND id_article_budgetaire=${vehicule[0].id_article_budgetaire} 
                                   AND echeance=?`,
                                [this.data.id_taxe, this.data.echeance],
                            );

                            if (montant.length === 0) {
                                throw new AppError('Problème entre la taxe et le vehicule!', 400);
                            }

                            return montant;
                        } catch (err) {
                            throw err;
                        }

                    }
                    else {
                        try {
                            const [montant] = await DB.query(
                                `SELECT montant, code_taxe,exercice,devise
                                 FROM v_all_tarif
                                 WHERE id_taxe=? 
                                   AND id_categorie=${vehicule[0].id_categorie} 
                                   AND id_article_budgetaire=${vehicule[0].id_article_budgetaire} 
                             `,
                                [this.data.id_taxe],
                            );

                            if (montant.length === 0) {
                                throw new AppError('Problème entre la taxe et le vehicule!', 400);
                            }

                            return montant;
                        } catch (err) {
                            throw err;
                        }

                    }

                });

                //2. Définition du taux
                const [taux] = await DB.query(
                        `SELECT valeur, date
                         FROM taux
                         ORDER BY date DESC
                         LIMIT 1`);

                //3.Insertion

                //Montant global
                const montant = await Promise.all(vehicules);
                const merge = montant.flat(1);
                const valeurInitiale = 0;

                const sumMontant = merge.reduce((acum, val) => {
                    return acum + Math.round(val.montant);
                }, valeurInitiale);

                //Nombre d'acte
                const nombreActe = montant.length;

                const idTaxation = await this.insert(nombreActe, sumMontant, merge[0], taux[0]);

                //4. Insert in taxation detail
                const details = this.data.id_vehicule.map(async (el, index) => {
                    const [details] = await DB.query(
                            `INSERT INTO detail_taxation
                             SET id_taxation=?,
                                 id_vehicule=?,
                                 montant=?,
                                 devise=?`, [idTaxation.insertId, el, merge[index].montant, merge[index].devise]);
                    return details;
                });

            }

            /**********************************************************************
             * BLOCK 2 : s'il n'y a qu'un seul vehicule
             * */

            else if (this.data.id_vehicule.length === 1) {
                const [vehicule] = await DB.query(`
                    SELECT *
                    FROM vehicule
                    WHERE id_vehicule = ?
                `, this.data.id_vehicule[0]);

                let montant;

                if (this.data.id_taxe == 15) {
                    const [rows] = await DB.query(
                        `SELECT montant, code_taxe,exercice,devise
                                 FROM v_all_tarif
                                 WHERE id_taxe=? 
                                   AND id_categorie=${vehicule[0].id_categorie} 
                                   AND id_article_budgetaire=${vehicule[0].id_article_budgetaire} 
                                   AND echeance=?`,
                        [this.data.id_taxe, this.data.echeance],
                    );

                    montant = rows;
                }
                else {
                    const [rows] = await DB.query(
                        `SELECT montant, code_taxe,exercice,devise
                                 FROM v_all_tarif
                                 WHERE id_taxe=? 
                                   AND id_categorie=${vehicule[0].id_categorie} 
                                   AND id_article_budgetaire=${vehicule[0].id_article_budgetaire} 
                             `,
                        [this.data.id_taxe],
                    );

                    montant = rows;
                }

                if (montant.length === 0) {
                    throw new AppError('Problème entre la taxe et le vehicule', 400);
                }

                //2. Définition du taux
                const [taux] = await DB.query(
                        `SELECT valeur, date
                         FROM taux
                         ORDER BY date DESC
                         LIMIT 1`);

                //3.Insertion

                //Nombre d'acte
                console.log(montant);
                const nombreActe = montant.length;

                const idTaxation = await this.insert(nombreActe, montant[0].montant, montant[0], taux[0]);

                //4. Insert in taxation detail
                const [details] = await DB.query(
                        `INSERT INTO detail_taxation
                         SET id_taxation=?,
                             id_vehicule=?,
                             montant=?,
                             devise=?`,
                    [idTaxation.insertId, this.data.id_vehicule, montant[0].montant, montant[0].devise]);
                return details;
            }

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

    //Get all vehicules from taxations
    async getAllVehiculesTaxation(id) {
        try {
            const [rows] = await DB.query(
                    `SELECT *
                     FROM v_all_vehicules_taxations
                     WHERE id_taxation = ?`, id);
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