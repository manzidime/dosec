const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Taxation {
    constructor(data)
    {
        this.data = data;
    }

    async insert()
    {
        //3. Insertion de la taxation
        const [rows] = await DB.query(`
            INSERT INTO taxation
            SET taux=?,
                id_contribuable=?,
                montant_global=?,
                montant=?,
                devise=?,
                exercice=?,
                id_taxe=?,
                id_site=?,
                nom_declarant=?,
                telephone_declarant=?,
                date_taxation=current_timestamp(),
                id_agent=?,
                nombre_acte=?,
                penalite=?,
                echeance=?,
                date_creation=current_timestamp()
        `, [this.data.taux, this.data.id_contribuable, this.data.montantTotal,
            this.data.sumMontant,
            this.data.montant[0].devise, this.data.exercice, this.data.id_taxe,
            this.data.id_site, this.data.nom_declarant.toUpperCase(),
            this.data.telephone_declarant, this.data.id_agent, this.data.montant.length,
            this.data.penalite * 1 !== 0 ? this.data.penalite : this.data.penalite = 0, this.data.echeance]);

        //4. Definition du numero taxation
        const lastIdTaxation = rows.insertId;
        const count = 1000 + lastIdTaxation;
        const numTaxation = `${count}/${this.data.montant[0].codeTaxe}/${this.data.exercice}`;

        await DB.query(`UPDATE taxation SET num_taxation='${numTaxation}' WHERE id_taxation=${lastIdTaxation}`);

        return rows;
    }

    //Creation
    async createOne()
    {
        this.data.id_taxe = Number(this.data.id_taxe);

        const ifProprieteIstaxed = async()=>{
            //Test si ces articles budgetaires font déjà parti d'une même taxation
            const articleExist = this.data.montant.map(async (el) => {
                if(this.data.id_taxe===15){
                    const [req] = await DB.query(
                        `SELECT *
                             FROM v_check_taxation
                             WHERE id_vehicule = ?
                               AND id_taxe = ?
                               AND echeance = ?`,
                        [el.propriete, this.data.id_taxe, this.data.echeance]);
                    return req[0];
                }
                else{
                    const [req] = await DB.query(
                        `SELECT *
                             FROM v_check_taxation
                             WHERE id_article_budgetaire = ?
                               AND id_taxe = ?
                               AND echeance = ? AND id_contribuable=?`,
                        [el.id_article, this.data.id_taxe, this.data.echeance, this.data.id_contribuable]);
                    return req[0];
                }
            });

            const res = await Promise.all(articleExist);
            const removeUndefined = res.filter(el=>el!==undefined)

            const message = removeUndefined.map(el=>{
                if(this.data.id_taxe === 15){
                    return `
                        <li>Taxe : ${el.taxe}</li>
                        <li>Echéance : ${el.echeance==='6(x1)'?'Premier semestre':el.echeance==='6(x2)'?'Deuxième semestre':el.echeance==='12'?'Annuelle':'Mensuelle'}</li>
                        <li>Numero du chassis : ${el.numero_chassis}</li>
                        <li>Numero de plaque : ${el.numero_plaque}</li>
                        <span class="d-block">--------------------------------</span> 
                    `
                }
                else{
                    return `
                        <li>Taxe : ${el.taxe}</li>
                        <li>Taxe : ${el.article}</li>
                        <li>Echéance : ${el.echeance==='6(x1)'?'Premier semestre':el.echeance==='6(x2)'?'Deuxième semestre':el.echeance==='12'?'Annuelle':el.echeance==='6'?'Semestrielle':'Mensuelle'}</li>
                        <li>Contribuable : ${el.nom}</li>
                        <span class="d-block">--------------------------------</span> 
                    `
                }
            }).join('')

            if (removeUndefined.length >= 1) {
                throw new AppError(
                    `la proprieté portant ces informations est déjà taxé pour la même taxe, la même échéance et le même contribuable : 
                            <ul class="text-light">
                                ${message}
                            </ul> 
                        `,400);
            }
        }


        /**********************************************************************
         * BLOCK 1 : s'il y a plusieurs vehicules
         * */

        //1. Définition du montant
        if (this.data.montant.length > 1) {
            try {
                console.log('superieur à 1')
                //Test si ces articles budgetaires font déjà parti d'une même taxation
                await ifProprieteIstaxed()

                //3.Insertion
                const idTaxation = await this.insert();

                //4. Insert in taxation detail
                return this.data.montant.map(async (el, index) => {
                    const [details] = await DB.query(
                            `INSERT INTO detail_taxation
                             SET id_taxation=?,
                                 id_vehicule=?,
                                 montant=?,
                                 devise=?`,
                        [idTaxation.insertId, el.propriete, el.montantArticle, el.devise]);
                    return details;
                });
            } catch (err) {
                throw err;
            }
        }

        /**********************************************************************
         * BLOCK 2 : s'il n'y a qu'un seul vehicule
         * */

        else if (this.data.montant.length === 1) {
            try{
                console.log('egal 1')
                //Test si ces articles budgetaires font déjà parti d'une même taxation
                await ifProprieteIstaxed()

                //3.Insertion
                const idTaxation = await this.insert();

                //4. Insert in taxation detail
                const [details] = await DB.query(
                        `INSERT INTO detail_taxation
                         SET id_taxation=?,
                             id_vehicule=?,
                             montant=?,
                             devise=?`,
                    [idTaxation.insertId, this.data.montant[0].propriete, this.data.montant[0].montantArticle,
                        this.data.montant[0].devise]);

                return details;
            }
            catch(err){
                throw err
            }
        }
    }

    //Obtenir tous
    async getAll(user)
    {
        try {
            let query;
            if (user.id_fonction === 1) {
                query = `
                    SELECT *
                    FROM v_all_taxation
                    WHERE state = 'tax'
                `;
            } else {
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

    async getAllArticleFromTaxation(id)
    {
        try {
            const [rows] = await DB.query(`
                SELECT *
                FROM v_article_note_calcul
                WHERE id_taxation = ?
            `, id);
            return rows;
        } catch (err) {
            throw err;
        }
    }

    //Get all vehicules from taxations
    async getAllVehiculesTaxation(id)
    {
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
    async getValide(user)
    {
        try {
            let query;
            if (user.id_fonction === 1) {
                query = `
                    SELECT *
                    FROM v_all_taxation
                    WHERE state = 'ord'
                       OR state = 'att'
                `;
            } else {
                query = `
                    SELECT *
                    FROM v_all_taxation
                    WHERE id_site = ?
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
    async getOne(id)
    {
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
    async updateOne(id)
    {
        try {
            const [rows] = await DB.query(`
                UPDATE taxation
                SET observation=?,
                    avis=?
                WHERE id_taxation = ?`, [this.data.observation, this.data.avis, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucune taxation trouvée avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }

    }

    //desable one
    async desactiveOrActive(id)
    {
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
    async validateTaxation(id)
    {
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
                            observation=?,
                            date_validation=current_timestamp()
                        WHERE id_taxation = ?`,
                [this.data.id_compte, this.data.avis, this.data.id_validateur,
                    this.data.observation, id]);

            if (rows.affectedRows !== 1) {
                throw new AppError(`Aucune taxation trouvée avec l'id:${id}`, 403);
            }

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }

    }

    //note
    async note(user)
    {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT *
                    FROM v_note_calcul
                `;
            } else {
                query = `
                    SELECT *
                    FROM v_note_calcul
                    WHERE print = 0
                      AND id_site = ?
                `, [user.id_site];
            }

            const [rows] = await DB.query(query, user.id_site);

            return rows;
        } catch (err) {
            throw err;
        }
    }

    //note
    async getOneDoc(id)
    {
        try {
            const [rows] = await DB.query(
                    `SELECT *
                     FROM v_note_calcul
                     WHERE id_taxation = ?`, id);
            return rows;
        } catch (err) {
            throw err;
        }
    }

    async dataApi()
    {
        try {
            const [rows] = await DB.query(
                    `SELECT *
                     FROM v_note_calcul`);
            return rows;
        } catch (err) {
            throw err;
        }
    }

    //Marquer print
    async marquePrint(id)
    {
        try {
            const [rows] = await DB.query(`
                UPDATE taxation
                SET print=1
                WHERE id_taxation = ?`, id);

            return rows.affectedRows;
        } catch (err) {
            throw err;
        }

    }

};