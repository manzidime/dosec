const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Taxe {
    constructor(data) {
        this.data = data;
    }

    //1. Creation
    async createOne() {
        try {
            const [row] = await DB.query(
                    `INSERT INTO taxe
                     SET id_type_objet=?,
                         id_service_assiette=?,
                         designation=?,
                         description=?,
                         delai_jour=?,
                         periodicite=?,duree=?,exercice=?`, [this.data.type, this.data.service, this.data.designation.toUpperCase(),
                    this.data.description.toUpperCase(), this.data.delai, this.data.periodicite,this.data.duree,this.data.exercice]);

            return row.insertId
        } catch (err) {
            throw err
        }
    }

    //4. Update
    async updateOne(id) {
        try {
            const [rows] = await DB.query(`
                        UPDATE taxe
                        SET id_type_objet=?,
                            id_service_assiette=?,
                            designation=?,
                            description=?,
                            delai_jour=?,
                            periodicite=?,duree=?,exercice=?
                        WHERE id_taxe = ?`,
                [this.data.type, this.data.service, this.data.designation.toUpperCase(), this.data.description.toUpperCase(),
                    this.data.delai, this.data.periodicite,this.data.duree,this.data.exercice, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucune taxe trouvée avec l'id:${id}`, 403);
            }
            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }

    //Active or disable
    async desactiveOrActive(id) {
        try {
            const [rows] = await DB.query(`
                        UPDATE taxe
                        SET active=?
                        WHERE id_taxe = ?`,
                [this.data.active, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucune taxe trouvée avec l'id:${id}`, 403);
            }
            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }

    //Get all car
    async getAll(user) {
        console.log(user.operation)
        try {
            let query
            if (user.administrer === 1) {
                query = `
                    SELECT *
                    FROM v_all_taxe
                    ORDER BY id_taxe DESC
                `
            } else {
                query = `
                    SELECT *
                    FROM v_all_taxe
                    WHERE active = 'true' AND id_taxe=${user.operation}
                    ORDER BY id_taxe DESC
                `
            }
            const [rows] = await DB.query(query);
            return rows;
        } catch (err) {
            throw err;
        }

    };

    async getOne(id) {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM v_all_taxe
                WHERE id_taxe = ?
            `, id);

            if (rows.length !== 1) {
                throw new AppError(`Aucune taxe trouvée avec l'id:${id}`, 403);
            }
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    async getByOTherTable(id,user) {
        try {
            let query
            if(user.administrer===1){
                query = `
                    SELECT *
                    FROM taxe WHERE id_service_assiette=${id}
             `
            }
            else{
                query = `
                    SELECT *
                    FROM taxe
                    WHERE id_service_assiette=${id} AND id_taxe=${user.operation}
                `
            }
            const [rows] = await DB.query(query);
            return rows;
        } catch (err) {
            throw err;
        }
    }
};