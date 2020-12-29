const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Propriete {
    constructor(data)
    {
        this.data = data;
    }

    //Create car
    async createOne()
    {
        try {
            if (this.data.id_taxe === 15) {
                //1. Verification si la plaque ou le chassis existe déjà dans la base
                const [plaqueOrChassis] = await DB.query(`
                    SELECT numero_plaque, numero_chassis
                    FROM propriete
                    WHERE numero_plaque = ?
                       OR numero_chassis = ?
                `, [this.data.numero_plaque, this.data.numero_chassis]);

                if (plaqueOrChassis.length !== 0) {
                    throw new AppError('Cette plaque ou ce chassis existe déjà', 400);
                }

                //2. Verification si la date de mise en circulation est supérieure au jour encours

                const date = new Date(this.data.mise_en_circulation);
                if (date > Date.now()) {
                    throw new AppError(
                        'La date de mise en circulation n\'est doit pas être supérieur à la date d\'aujourd\'hui', 400);
                }

                //3. Insertion des données dans la base
                const [rows] = await DB.query(`
                    INSERT INTO propriete
                    SET id_article_budgetaire=?,
                        id_categorie=?,
                        id_contribuable=?,
                        numero_chassis=?,
                        numero_plaque=?,
                        model=?,
                        marque=?,
                        couleur=?,
                        charge_utile=?,
                        mise_en_circulation=?,
                        id_agent=?,
                        id_site=?,
                        type=?,
                        lien_taxe=?,
                        date_creation=current_timestamp()
                `, [this.data.id_article_budgetaire, this.data.id_categorie, this.data.id_contribuable,
                    this.data.numero_chassis, this.data.numero_plaque, this.data.model, this.data.marque,
                    this.data.couleur,
                    this.data.charge_utile, this.data.mise_en_circulation, this.data.id_agent, this.data.id_site, 'v',
                    this.data.id_taxe]);
                return rows;
            } else {
                //3. Insertion des données dans la base
                const [rows] = await DB.query(`
                    INSERT INTO propriete
                    SET id_article_budgetaire=?,
                        id_categorie=?,
                        id_contribuable=?,
                        id_agent=?,
                        id_site=?,
                        type=?,
                        lien_taxe=?,
                        date_creation=current_timestamp()
                `, [this.data.id_article_budgetaire, this.data.id_categorie, this.data.id_contribuable,
                    this.data.id_agent, this.data.id_site, 'a', this.data.id_taxe]);
                return rows;
            }
        } catch (err) {
            throw err;
        }

    }

    //Get propriete
    async getAll(user)
    {
        try {
            let query;
            if (user.id_fonction === 1) {
                query = `
                    SELECT *
                    FROM v_all_propriete
                `;
            } else {
                query = `
                    SELECT *
                    FROM v_all_propriete
                    WHERE id_site = ?
                      AND active = 'true'
                `;
            }

            const [rows] = await DB.query(query, user.id_site);

            return rows;
        } catch (err) {
            throw err;
        }

    }

    //Obtenir toutes les proprietés vehicules
    async getAllCar(user,params)
    {
        try {
            let query;
            if (user.administrer === 1) {
                user.id_site=null
                query = `
                    SELECT *
                    FROM v_all_propriete
                    WHERE id_site=? || (type = 'v' AND id_contribuable=? AND id_service=?)
                `;
            } else {
                query = `
                    SELECT *
                    FROM v_all_propriete
                    WHERE id_site = ?
                      AND active = 'true'
                      AND type = 'v' AND id_contribuable=? AND id_service=?
                `;
            }

            const [rows] = await DB.query(query, [user.id_site, params.contribuable,params.service]);

            return rows;
        } catch (err) {
            throw err;
        }

    }

    //Obtenir toutes les proprietés vehicules
    async listeVehicules(user)
    {
        try {
            let query;
            if (user.administrer === 1) {
                user.id_site=null
                query = `
                    SELECT *
                    FROM v_all_propriete
                    WHERE type = 'v'
                `;
            } else {
                query = `
                    SELECT *
                    FROM v_all_propriete
                    WHERE id_site = ?
                      AND active = 'true'
                      AND type = 'v'
                `;
            }

            const [rows] = await DB.query(query, user.id_site);

            return rows;
        } catch (err) {
            throw err;
        }

    }

    //Obtenir toutes les proprietés non vehicule
    async getAllOther(user,params)
    {
        try {
            let query;
            if (user.administrer === 1) {
                user.id_site=null
                query = `
                    SELECT *
                    FROM v_all_propriete
                    WHERE id_site=? || (type = 'a' AND id_contribuable=? AND id_service=?)
                `;
            } else {
                query = `
                    SELECT *
                    FROM v_all_propriete
                    WHERE id_site = ?
                      AND active = 'true'
                      AND type = 'a' AND id_contribuable=? AND id_service=?
                `;
            }
            const [rows] = await DB.query(query,[user.id_site, params.contribuable,params.service]);

            // if (rows.length !== 1) {
            //     throw new AppError(`Aucune proprieté trouvée avec l'id:${params.contribuable} et ${params.service}`, 403);
            // }

            return rows;
        } catch (err) {
            throw err;
        }

    }

    //Get one car
    async getOne(id)
    {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM v_all_propriete
                WHERE id_propriete = ?
            `, id);

            if (rows.length !== 1) {
                throw new AppError(`Aucun Vehicule trouvé avec l'id:${id}`, 403);
            }

            return rows[0];
        } catch (err) {
            throw err;
        }
    }

    //Update one car
    async updateOne(id)
    {
        try {

            // const [plaqueOrChassis] = await DB.query(`
            //     SELECT numero_plaque, numero_chassis
            //     FROM vehicule
            //     WHERE numero_plaque = ?
            //        OR numero_chassis = ?
            // `, [this.data.numero_plaque, this.data.numero_chassis]);
            //
            // if (plaqueOrChassis.length !== 0) {
            //     throw new AppError('Cette plaque ou ce chassis existe déjà', 400);
            // }

            const [rows] = await DB.query(`
                UPDATE propriete
                SET id_article_budgetaire=?,
                    id_categorie=?,
                    id_contribuable=?,
                    numero_chassis=?,
                    numero_plaque=?,
                    model=?,
                    marque=?,
                    couleur=?,
                    charge_utile=?,
                    mise_en_circulation=?
                WHERE id_propriete = ?
            `, [this.data.id_article_budgetaire, this.data.id_categorie, this.data.id_contribuable,
                this.data.numero_chassis, this.data.numero_plaque, this.data.model, this.data.marque, this.data.couleur,
                this.data.charge_utile, this.data.mise_en_circulation, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucune propriété trouvée avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }

    }

    //desable one car
    async desactiveOrActive(id)
    {
        try {
            const [rows] = await DB.query(`
                UPDATE propriete
                SET active=?
                WHERE id_propriete = ?
            `, [this.data.active, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucune propriété trouvée avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }

    async getByOTherTable(id)
    {
        try {
            const [rows] = await DB.query(`
                SELECT id_propriete,
                       numero_chassis,
                       numero_plaque,
                       marque,
                       model,
                       couleur,
                       id_categorie,
                       id_article_budgetaire
                FROM propriete
                WHERE id_contribuable = ?
            `, id);
            return rows;
        } catch (err) {
            throw err;
        }
    }
};