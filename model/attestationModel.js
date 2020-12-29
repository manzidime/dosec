const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Attestation {
    constructor(data) {
        this.data = data;
    }

    //Creation
    async createOne() {
        try {
            const [att] = await DB.query(
                `SELECT id_taxation FROM attestation WHERE id_taxation=${this.data.id_taxation}`);

            if (att.length === 1) {
                throw new AppError(`Cette taxation a déjà été attestée`, 400);
            }

            const [rows] = await DB.query(`
                INSERT INTO attestation
                SET date_attestation=?,
                    numero_bordereau=?,
                    id_taxation=?,
                    montant=?,
                    montant_penalite=?,
                    montant_global=?,
                    avis=?,
                    id_site=?,
                    id_agent=?,
                    devise=?,
                    date_creation=current_timestamp()
            `, [this.data.date_attestation, this.data.numero_bordereau, this.data.id_taxation, this.data.montant,
                this.data.montant_penalite,
                this.data.montant_global,
                this.data.avis, this.data.id_site, this.data.id_agent, this.data.devise]);

            if (rows.insertId) {
                await DB.query(`UPDATE taxation SET state='att' WHERE id_taxation=${this.data.id_taxation}`);
            }
            return rows;
        } catch (err) {
            throw err;
        }

    }

    async getAll(user) {
        try {
            let query;
            if (user.id_fonction === 1) {
                query = `
                    SELECT *
                    FROM v_all_attestation
                `;
            }
            else {
                query = `
                    SELECT *
                    FROM v_all_attestation
                    WHERE id_site = ?
                `;
            }

            const [rows] = await DB.query(query, user.id_site);

            return rows;
        } catch (err) {
            throw err;
        }

    }

    //Obtenir toutes les taxations ordonnancées
    async getTaxOrd(user) {
        try {
            let query;
            if (user.id_fonction === 1) {
                query = `
                    SELECT *
                    FROM v_taxation_ord
                `;
            }
            else {
                query = `
                    SELECT *
                    FROM v_taxation_ord
                    WHERE id_site = ?
                `;
            }

            const [rows] = await DB.query(query, user.id_site);

            return rows;
        } catch (err) {
            throw err;
        }

    }

    async doc(user,plaque) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT *
                    FROM v_document
                `;
            }
            else {
                query = `
                    SELECT *
                    FROM v_document
                    WHERE id_site = ? AND print=0
                `;
            }

            const [rows] = await DB.query(query, user.id_site);

            return rows;
        } catch (err) {
            throw err;
        }

    }

    async marquePrint(id)
    {
        try {
            const [rows] = await DB.query(`
                UPDATE attestation
                SET print=1
                WHERE id_attestation = ?`, id);

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }

    }

    //Get doc by plaque
    async docByPlaque(id,plaque) {
        try {
            const [rows] = await DB.query(`
                    SELECT *
                    FROM v_document
                    WHERE id_attestation=? AND numero_plaque=?`, [id,plaque]);
            return rows;
        } catch (err) {
            throw err;
        }
    }

    //Get contribuable
    async getOne(id) {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM attestation
                WHERE id_attestation = ?
            `, id);

            if (rows.length !== 1) {
                throw new AppError(`Aucune attestation trouvée avec l'id:${id}`, 403);
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
                UPDATE attestation
                SET numero_bordereau=?,
                    id_taxation=?,
                    montant=?,
                    montant_penalite=?,
                    montant_global=?
                WHERE id_attestation = ?
            `, [this.data.numero_bordereau, this.data.id_taxation, this.data.montant, this.data.montant_penalite,
                this.data.montant_global, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucune attestation trouvée avec l'id:${id}`, 403);
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
                UPDATE attestation
                SET active=?
                WHERE id_attestation = ?
            `, [this.data.active, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucune attestation trouvée avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }

    //note de cacul
    async noteCalcul() {
        try {
            const [rows] = await DB.query(`SELECT *
                                           FROM v_note_calcul`);
            return rows;
        } catch (err) {
            throw err;
        }
    }
};