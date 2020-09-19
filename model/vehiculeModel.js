const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Vehicule {
    constructor(data) {
        this.data = data;
    }

    //Create car
    async createOne() {
        try {
            const [plaqueOrChassis] = await DB.query(`
                SELECT numero_plaque, numero_chassis
                FROM vehicule
                WHERE numero_plaque = ?
                   OR numero_chassis = ?
            `, [this.data.numero_plaque, this.data.numero_chassis]);

            if (plaqueOrChassis.length !== 0) {
                throw new AppError('Cette plaque ou ce chassis existe déjà', 400);
            }

            const [rows] = await DB.query(`
                INSERT INTO vehicule
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
                    date_creation=current_timestamp()
            `, [this.data.id_article_budgetaire*1, this.data.id_categorie, this.data.id_contribuable,
                this.data.numero_chassis, this.data.numero_plaque, this.data.model, this.data.marque, this.data.couleur,
                this.data.charge_utile, this.data.mise_en_circulation, this.data.id_agent, this.data.id_site]);
            return rows;
        } catch (err) {
            throw err;
        }

    }

    //Get all car
    async getAll(user) {
        try {
            let query;
            if (user.id_fonction === 1) {
                query = `
                    SELECT *
                    FROM v_all_vehicule
                `;
            }
            else {
                query = `
                    SELECT *
                    FROM v_all_vehicule
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

    //Get one car
    async getOne(id) {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM v_all_vehicule
                WHERE id_vehicule = ?
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
    async updateOne(id) {
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
                UPDATE vehicule
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
                WHERE id_vehicule = ?
            `, [this.data.id_article_budgetaire, this.data.id_categorie, this.data.id_contribuable,
                this.data.numero_chassis, this.data.numero_plaque, this.data.model, this.data.marque, this.data.couleur,
                this.data.charge_utile, this.data.mise_en_circulation, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun Vehicule trouvé avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }

    }

    //desable one car
    async desactiveOrActive(id) {
        try {
            const [rows] = await DB.query(`
                UPDATE vehicule
                SET active=?
                WHERE id_vehicule = ?
            `, [this.data.active, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun Vehicule trouvé avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }

    async getByOTherTable(id){
        try {
            const [rows] = await DB.query(`
                    SELECT id_vehicule,numero_chassis,numero_plaque,marque,model,couleur
                    FROM vehicule WHERE id_contribuable=?
                `,id);
            return rows;
        } catch (err) {
            throw err;
        }
    }
};