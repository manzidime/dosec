const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class TypeObjet {
    constructor(data) {
        this.data = data;
    }

    //Get all car
    async getAll(user) {
        try {
            let query
            if(user.administrer===1){
                query = `
                SELECT *
                FROM type_objet
            `
            }
            else{
                query = `
                SELECT *
                FROM type_objet WHERE active='true'
            `
            }
            const [rows] = await DB.query(query);

            return rows;
        } catch (err) {
            throw err;
        }

    };
};