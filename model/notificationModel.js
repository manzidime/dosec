const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Notification {
    constructor(data) {
        this.data = data;
    }
    //Creation d'un contribuable
    async createOne() {
        try {
            const [rows] = await DB.query(`
                INSERT INTO notification
                SET titre=?,
                    description=?,
                    date=current_timestamp(),
                    id_document=?,
                    link=?
            `, [this.data.titre, this.data.description, this.data.id_document, this.data.link]);
            return rows.insertId;
        } catch (err) {
            throw err;
        }

    }

    //Obtenir tous
    async getAll() {
        try {
            const [rows] = await DB.query(`
                    SELECT *
                    FROM v_all_notification WHERE active='true'
                `);
            return rows;
        } catch (err) {
            throw err;
        }

    }

    //desable one
    async desactiveOrActive(id) {
        try {
            const [rows] = await DB.query(`
                UPDATE notification
                SET active=?
                WHERE id_notification = ?
            `, [this.data.active, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucune notification trouvée avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }

    //desable one
    async readNotification(id) {
        try {
            const [rows] = await DB.query(`
                UPDATE notification
                SET readed=?
                WHERE id_notification = ?
            `, [this.data.readed, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucune notification trouvée avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }
    }
};