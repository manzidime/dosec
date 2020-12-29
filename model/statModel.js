const DB = require('./DB');
const AppError = require('./../utils/appError');

module.exports = class Stat {
    constructor(data) {
        this.data = data;
    }

    //Obtenir tous
    async countAgent(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT COUNT(id_agent) count
                    FROM v_agent_stat
                `;
            } else {
                query = `
                    SELECT COUNT(id_agent) count
                    FROM v_agent_stat
                    WHERE id_site = ?
                `;
            }

            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }
    }

    async agentActif(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT COUNT(active) count
                    FROM v_agent_stat
                    WHERE active = 'true'
                `;
            } else {
                query = `
                    SELECT COUNT(active) count
                    FROM v_agent_stat
                    WHERE id_site = ?
                      AND active = 'true'
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    async agentInactif(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT COUNT(active) count
                    FROM v_agent_stat
                    WHERE active = 'false'
                `;
            } else {
                query = `
                    SELECT COUNT(active) count
                    FROM v_agent_stat
                    WHERE id_site = ?
                      AND active = 'false'
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    //CONTRIBUABLE
    async countCont(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT COUNT(active) count
                    FROM v_contribuable_stat
                `;
            } else {
                query = `
                    SELECT COUNT(active) count
                    FROM v_contribuable_stat
                    WHERE id_site = ?
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    async countActif(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT COUNT(active) count
                    FROM v_contribuable_stat
                    WHERE active = 'true'
                `;
            } else {
                query = `
                    SELECT COUNT(active) count
                    FROM v_contribuable_stat
                    WHERE id_site = ?
                      AND active = 'true'
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    async contInactif(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT COUNT(active) count
                    FROM v_contribuable_stat
                    WHERE active = 'false'
                `;
            } else {
                query = `
                    SELECT COUNT(active) count
                    FROM v_contribuable_stat
                    WHERE id_site = ?
                      AND active = 'false'
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    //VEHICULES
    async vehCount(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT COUNT(active) count
                    FROM v_veh_stat
                `;
            } else {
                query = `
                    SELECT COUNT(active) count
                    FROM v_veh_stat
                    WHERE id_site = ?
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    async vehInactif(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT COUNT(active) count
                    FROM v_veh_stat
                    WHERE active = 'false'
                `;
            } else {
                query = `
                    SELECT COUNT(active) count
                    FROM v_veh_stat
                    WHERE id_site = ?
                      AND active = 'false'
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    async vehActif(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT COUNT(active) count
                    FROM v_veh_stat
                    WHERE active = 'true'
                `;
            } else {
                query = `
                    SELECT COUNT(active) count
                    FROM v_veh_stat
                    WHERE id_site = ?
                      AND active = 'true'
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    //NOTE DE CALCUL
    async noteCount(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT COUNT(id_taxation) count
                    FROM v_note_calcul
                `;
            } else {
                query = `
                    SELECT COUNT(id_taxation) count
                    FROM v_note_calcul
                    WHERE id_site = ?
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }
    async noteNoprint(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT print, COUNT(id_taxation) count
                    FROM v_note_calcul WHERE print=0
                `;
            } else {
                query = `
                    SELECT print, COUNT(id_taxation) count
                    FROM v_note_calcul
                    WHERE id_site = ? AND print=0
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }
    async notePrint(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT print, COUNT(id_taxation) count
                    FROM v_note_calcul WHERE print=1
                `;
            } else {
                query = `
                    SELECT print, COUNT(id_taxation) count
                    FROM v_note_calcul
                    WHERE id_site = ? AND print=1
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    //DOCUMENT
    async docCount(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT COUNT(id_attestation) count
                    FROM v_document
                `;
            } else {
                query = `
                    SELECT COUNT(id_attestation) count
                    FROM v_document
                    WHERE id_site = ?
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }
    async docPrint(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT print, COUNT(id_attestation) count
                    FROM v_document WHERE print=1
                `;
            } else {
                query = `
                    SELECT print, COUNT(id_attestation) count
                    FROM v_document
                    WHERE id_site = ? AND print=1
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }
    async docNoPrint(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT print, COUNT(id_attestation) count
                    FROM v_document WHERE print=0
                `;
            } else {
                query = `
                    SELECT print, COUNT(id_attestation) count
                    FROM v_document
                    WHERE id_site = ? AND print=0
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    //TAXATION
    async taxCount(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT COUNT(id_taxation) count
                    FROM v_all_taxation
                `;
            } else {
                query = `
                    SELECT COUNT(id_taxation) count
                    FROM v_all_taxation
                    WHERE id_site = ?
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }
    async taxSum(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT devise, SUM(montant_global) sum
                    FROM v_all_taxation
                `;
            } else {
                query = `
                    SELECT devise, SUM(montant_global) sum
                    FROM v_all_taxation
                    WHERE id_site = ?
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }
    async taxValidCount(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT COUNT(id_taxation) count
                    FROM v_all_taxation WHERE state='ord'
                `;
            } else {
                query = `
                    SELECT COUNT(id_taxation) count
                    FROM v_all_taxation 
                    WHERE id_site = ? AND state='ord'
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }
    async taxValidSum(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT SUM(montant_global) sum
                    FROM v_all_taxation WHERE state='ord'
                `;
            } else {
                query = `
                    SELECT SUM(montant_global) sum
                    FROM v_all_taxation 
                    WHERE id_site = ? AND state='ord'
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    async taxNoValidCount(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT COUNT(id_taxation) count
                    FROM v_all_taxation WHERE state='tax'
                `;
            } else {
                query = `
                    SELECT COUNT(id_taxation) count
                    FROM v_all_taxation 
                    WHERE id_site = ? AND state='tax'
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }
    async taxNoValidSum(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT SUM(montant_global) sum
                    FROM v_all_taxation WHERE state='tax'
                `;
            } else {
                query = `
                    SELECT SUM(montant_global) sum
                    FROM v_all_taxation 
                    WHERE id_site = ? AND state='tax'
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

    async taxAttCount(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT COUNT(id_taxation) count
                    FROM v_all_taxation WHERE state='att'
                `;
            } else {
                query = `
                    SELECT COUNT(id_taxation) count
                    FROM v_all_taxation 
                    WHERE id_site = ? AND state='att'
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }
    async taxAttSum(user) {
        try {
            let query;
            if (user.administrer === 1) {
                query = `
                    SELECT SUM(montant_global) sum
                    FROM v_all_taxation WHERE state='att'
                `;
            } else {
                query = `
                    SELECT SUM(montant_global) sum
                    FROM v_all_taxation 
                    WHERE id_site = ? AND state='att'
                `;
            }
            const [rows] = await DB.query(query, user.id_site);
            return rows[0];
        } catch (err) {
            throw err;
        }

    }

};