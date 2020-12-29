const validator = require('validator')
const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Contribuable {
    constructor(data) {
        this.data = data;
    }
    //Creation d'un contribuable
    async createOne() {
        try {
            //Vérification du format du téléphone
            if((this.data.telephone.length < 10 || this.data.telephone.length > 13) || !validator.isNumeric (this.data.telephone, [{no_symbols: true}])){
                throw new AppError(`Le format de ce numéro de téléphone: ${this.data.telephone} n'est pas valide`, 400)
            }

            const [rows] = await DB.query(`
                INSERT INTO contribuable
                SET nom=?,
                    telephone=?,
                    ville=?,
                    id_district=?,
                    id_commune=?,
                    id_quartier=?,
                    avenue=?,
                    numero=?,
                    id_site=?,
                    id_agent=?,
                    observation=?,
                    date_creation=current_timestamp()
            `, [this.data.nom.toUpperCase(), this.data.telephone, this.data.ville, this.data.id_district, this.data.id_commune,
                this.data.id_quartier,
                this.data.avenue, this.data.numero, this.data.id_site, this.data.id_agent, this.data.observationContribuable]);
            return rows.insertId;
        } catch (err) {
            throw err;
        }

    }

    //Obtenir tous
    async getAll(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT *
                    FROM v_all_contribuable ORDER BY id_contribuable DESC
                `;
            }
            else {
                query = `
                    SELECT *
                    FROM v_all_contribuable
                    WHERE id_site = ?
                      AND active = 'true' ORDER BY id_contribuable DESC
                `;
            }

            const [rows] = await DB.query(query, user.id_site);

            return rows;
        } catch (err) {
            throw err;
        }

    }

    //Obtenir tous les contribuables qui ont des vehicules
    async getAllVehicules(){
        try{
            const [rows] = await DB.query(`SELECT * FROM v_all_contribuables_contains_vehicules`)
            return rows
        }
        catch(err){
            throw err
        }
    }

    //Get contribuable
    async getOne(id) {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM v_all_contribuable
                WHERE id_contribuable = ?
            `, id);

            if (rows.length !== 1) {
                throw new AppError(`Aucun contribuable trouvé avec l'id:${id}`, 403);
            }

            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    //Update
    async updateOne(id) {
        const commune = this.data.id_commune * 1;
        try {
            const [rows] = await DB.query(`
                UPDATE contribuable
                SET nom=?,
                    telephone=?,
                    ville=?,
                    id_district=?,
                    id_commune=?,
                    id_quartier=?,
                    avenue=?,
                    numero=?,
                    observation=?
                WHERE id_contribuable = ?
            `, [this.data.nom, this.data.telephone, this.data.ville, this.data.id_district, commune,
                this.data.id_quartier, this.data.avenue, this.data.numero,this.data.observation, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun contribuable trouvé avec l'id:${id}`, 403);
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
                UPDATE contribuable
                SET active=?
                WHERE id_contribuable = ?
            `, [this.data.active, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun contribuable trouvé avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }
};