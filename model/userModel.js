const bcrypt = require('bcryptjs');
const slugify = require('slugify');
const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class User {
    constructor(data) {
        this.data = data;
    }

    //!All user
    async getAll(user) {
        try {
            let query;
            if (user.id_fonction === 1) {
                query = `
                    SELECT *
                    FROM v_all_agent
                `;
            }
            else {
                query = `
                SELECT *
                FROM v_all_agent WHERE id_site=? AND active='true'
            `
            }
            const [rows] = await DB.query(query,user.id_site);

            return rows;

        } catch (err) {
            throw err;
        }
    }

    //!Get a user by id
    async getOne(id) {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM v_all_agent
                WHERE id_agent = ?
            `, id);
            if (rows.length === 0) {
                throw new AppError(`Aucun n'agent trouvé avec l'id:${id}`, 403);
            }

            return rows;
        } catch (err) {
            throw err;
        }

    }

    //!Get a user by login
    async getOneByLogin(login) {
        try {
            const [user] = await DB.query(`
                SELECT id_agent, login, password, active
                FROM agent
                WHERE login = ?
                  AND active = 'true'
            `, login);

            return user;
        } catch (err) {
            throw err;
        }

    }

    //!Hash password
    async hashPassword(password) {
        return await bcrypt.hash(password, 12);
    }

    //!Verify password
    async comparePassword(passwordClient, passwordDB) {
        return await bcrypt.compare(passwordClient, passwordDB);
    }

    //!Insert a User
    async createOne() {
        try {

            //1. Vérifier si le matricule existe déjà. Le matricule doit être unique
            const [agentExist] = await DB.query(`
                SELECT matricule
                FROM agent
                WHERE matricule = ?
            `, [this.data.matricule]);

            if (agentExist.length === 1) {
                throw new AppError(`le matricule: ${this.data.matricule} existe déjà`, 400);
            }

            //2. Hash password
            const password = await this.hashPassword(this.data.password);

            //3. Login
            const login = `${this.data.prenom}-${this.data.matricule}`;

            //4. slug
            const slug = slugify(`${this.data.prenom} ${this.data.nom} ${this.data.matricule}`, {
                lower: true,
                replacement: '-',
            });

            //4. Insertion de nouvelles données
            const [rows] = await DB.query(`
                INSERT INTO agent
                SET nom=?,
                    prenom=?,
                    matricule=?,
                    id_fonction=?,
                    sexe=?,
                    login=?,
                    password=?,
                    id_site=?,
                    peutTaxer=?,
                    peutApurer=?,
                    peutEncoder=?,
                    peutOrdonnancer=?,
                    peutAdministrer=?,
                    peutFaireRapport=?,
                    peutImprimer=?,
                    peutSite=?,
                    peutStock=?,
                    slug=?,
                    date_creation=current_timestamp()
            `, [this.data.nom.toUpperCase(), this.data.prenom, this.data.matricule, this.data.id_fonction,
                this.data.sexe,
                login.toLowerCase(),
                password, this.data.id_site, this.data.peutTaxer, this.data.peutApurer, this.data.peutEncoder,
                this.data.peutOrdonnancer, this.data.peutAdministrer, this.data.peutFaireRapport,
                this.data.peutImprimer,
                this.data.peutSite, this.data.peutStock, slug]);

            return rows.insertId;
        } catch (err) {
            throw err;
        }

    }

    //!Update a User
    async updateOne(id) {
        try {
            const [rows] = await DB.query(`
                UPDATE agent
                SET nom=?,
                    prenom=?,
                    matricule=?,
                    id_fonction=?,
                    sexe=?,
                    peutTaxer=?,
                    peutApurer=?,
                    peutEncoder=?,
                    peutOrdonnancer=?,
                    peutAdministrer=?,
                    peutFaireRapport=?,
                    peutImprimer=?,
                    peutSite=?,
                    peutStock=?
                WHERE id_agent = ?
            `, [this.data.nom.toUpperCase(), this.data.prenom, this.data.matricule, this.data.id_fonction,
                this.data.sexe, this.data.peutTaxer, this.data.peutApurer, this.data.peutEncoder,
                this.data.peutOrdonnancer, this.data.peutAdministrer, this.data.peutFaireRapport,
                this.data.peutImprimer, this.data.peutSite, this.data.peutStock, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun n'agent trouvé avec l'id:${id}`, 403);
            }

            return rows;
        } catch (err) {
            throw err;
        }

    }

    //!Desable Or Active a User
    async desactiveOrActive(id) {
        try {
            const [rows] = await DB.query(`
                UPDATE agent
                SET active=?
                WHERE id_agent = ?
            `, [this.data.active, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucun n'agent trouvé avec l'id:${id}`, 403);
            }

            return rows;
        } catch (err) {
            throw err;
        }

    }

    //!Change me password
    async updateMePassword(user) {
        try {
            //1. Verifier le password courant(actuel) est correct
            if (!await this.comparePassword(this.data.oldPassword, user.password)) {
                throw new AppError('Votre mot de passe actuel n\'est pas correct', 400);
            }

            //2. Verifier si les deux mots de passe sont le même
            if (this.data.password !== this.data.passwordConfirm) {
                throw new AppError('Vos deux mots de passe doivent être le même', 400);
            }

            //3. hasher le mot de passe
            const password = await this.hashPassword(this.data.password);

            const [row] = await DB.query(`
                UPDATE agent
                SET password=?
                WHERE id_agent = ?
            `, [password, user.id_agent]);

            return row;
        } catch (err) {
            throw err;
        }

    }
};