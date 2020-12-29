import '@babel/polyfill';
import dayjs, {Dayjs} from 'dayjs';
import dom from './utils/dom';
import {alert, clearHtml} from './utils/alert';
import {login, logout} from './login';
import {changePassword} from './changePassword';
import {} from './chart-custom';
import {
    newTaxation,
    updateTaxation,
    desableTaxation,
    validateTaxation,
    allTaxation,
    brokeTaxation
} from './newTaxation';
import {newAttestation} from './modelController/attestationModel';
import {newUser, userUpdate, stateUser, allUser} from './user';
import {allSites, createOne, deleteSite, updateSite} from './modelController/siteModel';
import {allCommune} from './modelController/communeModel';
import {listSite, search} from './viewController/siteView';
import {allServices, createService, stateService, updateService} from './modelController/serviceModel';
import {displayService, paginationService, searchService} from './viewController/serviceView';
import removeModal from './utils/removeModal';
import {allCaterogie} from './modelController/categorieModel';
import {allArticle, articleBytype, createArticle, stateArticle, updateArticle} from './modelController/articleModel';
import {allExercice} from './modelController/exerciceModel';
import {createTarif, getAllTarif, montantTaxation, stateTarif, updateTarif} from './modelController/tarifModel';
import {listTarif, renderEcheance} from './viewController/tarifView';
import {createTaxe, allTaxe, stateTaxe, updateTaxe} from './modelController/taxeModel';
import {createApi} from './modelController/apiModel';
import {
    newPerson,
    allContribuables,
    updatePerson,
    stateContribuable,
    oneContibuable
} from './modelController/contribuableModel';
import {listContribuable} from './viewController/contribuableView';
import {allQuartier} from './modelController/quartierModel';
import {
    allProprieteNoVehicules,
    allVehicules, listOfVehicules,
    newVehicule,
    stateVehicule,
    updateVehicule
} from './modelController/vehiculeModel';
import {table} from './utils/datatable';
import {formulaire, listTaxation, resumeTaxation} from './viewController/taxationView';
import {template} from './viewController/taxeView';
import {templateArticle} from './viewController/articleView';
import {allTaux, createTaux} from './modelController/tauxModel';
import {templateTaux} from './viewController/tauxView';
import {allNotification, readNotification, stateNotification} from './modelController/notificationModel';
import {renderIcon, templateNotification} from './viewController/notificationView';
import {formulaireArticle, formulaireVehicule} from './viewController/proprieteView';
import {select2} from './utils/select2';
import {
    renderArticleByTypeInPropriete,
    renderCommune, renderExercice,
    renderQuartier,
    renderTaxeByService
} from './viewController/selectOption';
import {date} from './utils/datepicker';
import {allDistrict} from './modelController/districtModel';
import {listVehicule} from './viewController/vehiculeView';
import {listAttestation} from './viewController/attestationView';
import {taxationOrd} from './modelController/attestationModel';
import {listNotesCalcul} from './modelController/taxationModel';
import {listNote} from './viewController/noteView';
import {spinnerButton, spinnerTable} from './utils/spinner';
import {allFonctions} from './modelController/fonctionModel';
import {templateUser} from './viewController/userView';

/**************************************************************************************
 * UTILITIES
 */

//Variables globales
let userInfo
if(dom.pcContainer){
    /*Data qui se trouve sur la page home et contient toutes
    * les informations liées à l'utilisateur actuel c'est-à-dire
    * l'utilisateur en ligne. Une façon pour nous de faire passer
    * les informations de l'utilisateur de back au client*/
    userInfo = JSON.parse(dom.pcContainer.dataset.userinfo)
}

//Render notification
const renderNotification = async () => {
    const notifications = await allNotification();
    renderIcon(notifications);
    templateNotification(notifications);
};

//Restorer ou desactiver un service
const restoreOrDisableService = async (body, id) => {
    //1. Restore user
    await stateService(body, id);

    const current_page = 1;
    const rows = 10;

    //2. Get sites
    const services = await allServices();

    //Rendu tu tableau quand on fait la recherche
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        search(services, searchInput.value, dom.contentTable, rows, current_page);
    });

    //Rendu du tableau par defaut
    displayService(services, dom.contentTable, rows, current_page);
    const pagination = document.getElementById('pagination');
    paginationService(services, pagination, rows, current_page, dom.contentTable);
};

/**************************************************************************************
 * AUTHENTIFICATION*/

//1. Login
if (dom.formLogin) {
    dom.formLogin.addEventListener('submit', async (event) => {
        event.preventDefault();
        await login(dom.login.value, dom.password.value);
    });
}

//2. Logout
if (dom.logout) {
    dom.logout.addEventListener('click', logout);
}

//Change password
if (dom.formChangePassword) {
    dom.formChangePassword.addEventListener('submit', async (event) => {
        event.preventDefault();
        await changePassword(dom.oldPassword.value, dom.newPassword.value, dom.confirmPassword.value);
    });
}

/**************************************************************************************
 * CONTRIBUABLE*/

//Rendre la table contribuable
const renderTableContribuable = async () => {
    const contribuables = await allContribuables();
    const districts = await allDistrict();
    //render table
    listContribuable(contribuables, districts, dom.containerTable,userInfo);
    table();
};

//Affichage du tableau par defaut
window.addEventListener('load', async () => {
    if (window.location.pathname === '/home/all-person') {
        spinnerTable(dom.containerTable)
        await renderTableContribuable();
        dom.containerTable.addEventListener('change', async (e) => {
            const target = e.target;

            //Selection des communes par district
            if (target.matches('.district')) {
                const form = target.closest('.form-update-contribuable');
                const quartierDom = form.querySelector('.quartier');
                const districtId = target.value;
                const communesData = await allCommune();
                const communeDom = form.querySelector('.commune');
                renderCommune(districtId, communesData, communeDom, quartierDom);
            }

            //Selection des quartier par communes
            if (target.matches('.commune')) {
                const form = target.closest('.form-update-contribuable');
                const quartierDom = form.querySelector('.quartier');
                const communeId = target.value;
                const quartierData = await allQuartier();
                renderQuartier(communeId, quartierData, quartierDom);
            }

        });
    }

    if (window.location.pathname === '/home/new-contribuable') {
        dom.formNewPerson.addEventListener('change', async (e) => {
            const target = e.target;

            //Declarations des variables
            const quartierDom = document.querySelector('#quartier');

            //Selection des communes par district
            if (target.matches('#district')) {
                const districtId = target.value;
                const communesData = await allCommune();
                const communeDom = document.querySelector('#commune');
                renderCommune(districtId, communesData, communeDom, quartierDom);
            }

            //Selection des quartier par communes
            if (target.matches('#commune')) {
                const communeId = target.value;
                const quartierData = await allQuartier();
                renderQuartier(communeId, quartierData, quartierDom);
            }

        });
    }
});

//2. Nouveau contribuable
if (dom.formNewPerson) {
    dom.formNewPerson.addEventListener('submit', async (event) => {
        event.preventDefault();

        //1. GET DATA FROM FORM
        const body = {
            nom: dom.nomPersonne.value,
            telephone: dom.telephone.value,
            ville: dom.ville.value,
            id_district: dom.district.value,
            id_commune: dom.commune.value,
            id_quartier: dom.quartier.value,
            avenue: dom.avenue.value,
            numero: dom.numero.value,
            observationContribuable: dom.observation.value,
        };

        //2. Insert
        const newContribuable = await newPerson(body);

        //4. Refresh contribuable to part vehicule
        if (newContribuable >= 1) {
            //Render notification
            await renderNotification();
        }
    });

}

//3. Mise à jour du contribuable
if (dom.containerTable) {
    dom.containerTable.addEventListener('click', async (e) => {
        //e.preventDefault();
        const target = e.target;

        if (target.matches('.btn-update-contribuable')) {
            const form = target.closest('.form-update-contribuable');
            const id = form.dataset.id;

            const body = {
                nom: form.querySelector('.nom_personne').value,
                telephone: form.querySelector('.telephone').value,
                ville: form.querySelector('.ville').value,
                id_district: form.querySelector('.district').value,
                id_commune: form.querySelector('.commune').value,
                id_quartier: form.querySelector('.quartier').value,
                avenue: form.querySelector('.avenue').value,
                numero: form.querySelector('.numero').value,
                observation: form.querySelector('.observation').value,
            };

            const contribuableUpdated = await updatePerson(body, id);

            if (contribuableUpdated === 1) {
                await renderTableContribuable();
                removeModal();
            }
        }
    });
}

//4. Restore or delete
if (dom.containerTable) {
    dom.containerTable.addEventListener('click', async (event) => {
        const btn = event.target;
        let contBtn
        if (btn.closest('.btn-restore-contribuable')) {
            contBtn = btn.closest('.cont-button-contri')
            spinnerButton(contBtn)
            const id = btn.closest('.btn-restore-contribuable').dataset.row;
            const body = {active: 'true'};

            await stateContribuable(body, id);
            await renderTableContribuable();

        } else if (btn.closest('.btn-delete-contribuable')) {
            contBtn = btn.closest('.cont-button-contri')
            spinnerButton(contBtn)
            const id = btn.closest('.btn-delete-contribuable').dataset.row;
            const body = {active: 'false'};

            await stateContribuable(body, id);
            await renderTableContribuable();
        }
    });
}

/********************************************************************************
 * PROPRIETE
 */

//Tableau de la liste globale des vehicules
const renderTableVehicules = async () => {
    //2. data
    const vehicules = await listOfVehicules();
    const categories = JSON.parse(dom.containerTable.dataset.categorie);
    const articles = JSON.parse(dom.containerTable.dataset.article);
    const types = JSON.parse(dom.containerTable.dataset.type);
    listVehicule(vehicules, categories, types, articles, dom.containerTable,userInfo);
    table();
};

//1. Affichage du tableau par defaut, système select multiple
window.addEventListener('load', async () => {
    if (window.location.pathname === '/home/all-vehicule') {
        spinnerTable(dom.containerTable)
        await renderTableVehicules();
        date();
    }

    if (window.location.pathname === '/home/new-propriete') {
        //Affichages des formulaires
        if (dom.formNewPropriete) {
            //Rendre les taxes par le service selectionné
            if (dom.service) {
                /*Nous executons la fonction au cas ou un élément est déjà
                 selectionné par defaut lors du chargement de la page*/
                const idService = dom.service.value;
                if(idService!=='') await renderTaxeByService(idService,dom.taxe);
                else dom.taxe.innerHTML=''

                /*Nous executons la fonction au cas ou un élément est selectionné*/
                dom.service.addEventListener('change', async (event) => {
                    const idService = dom.service.value;
                    if(idService!=='') await renderTaxeByService(idService,dom.taxe);
                    else dom.taxe.innerHTML=''
                });
            }
            dom.formNewPropriete.addEventListener('change', async (e) => {
                //e.preventDefault();

                //1.Declarations variables
                const contribuable = dom.formNewPropriete.querySelector('#contribuable');
                const taxe = dom.formNewPropriete.querySelector('#taxe');
                const service = dom.formNewPropriete.querySelector('#service');
                const types = JSON.parse(dom.containerFormulairePropriete.dataset.type);
                const articles = JSON.parse(dom.containerFormulairePropriete.dataset.article);
                const categories = JSON.parse(dom.containerFormulairePropriete.dataset.categorie);

                //2. Affichage du formulaire selon la taxe
                if (e.target.matches('#taxe') && (contribuable.value != '' && taxe.value != '')) {
                    const contribuableDb = await oneContibuable(contribuable.value);
                    /*Nous affichons le formulaire d'insertion du vehicule
                     * si la taxe est le contrôle technique dans le cas contraire nous
                     * nous affichons le formulaire standard pour le choix d'article*/
                    if (taxe.value == 15) {
                        formulaireVehicule(dom.containerFormulairePropriete, contribuableDb, types, categories,
                            service.value);
                        select2();
                        date();
                    } else {
                        formulaireArticle(dom.containerFormulairePropriete, types, contribuableDb, categories,
                            service.value);
                        select2();
                    }
                }

                //3.Nous affichons les articles budgétaires quand le type change
                if (e.target.matches('#type')) {
                    const idType = e.target.value;
                    const container = dom.formNewPropriete.querySelector('#articles');
                    renderArticleByTypeInPropriete(idType, articles, container);
                }
            });

        }
    }
});

//1. Nouvelle propriete
if (dom.formNewPropriete) {
    dom.formNewPropriete.addEventListener('click', async (e) => {
        e.preventDefault();
        const target = e.target;
        const form = e.currentTarget;

        if (target.matches('.btn-new-propriete-vehicule')) {
            //Body
            const body = {
                id_article_budgetaire: form.querySelector('#articles').value,
                id_categorie: form.querySelector('#category').value,
                id_contribuable: form.querySelector('#contribuable').value,
                numero_chassis: form.querySelector('#chassis').value,
                numero_plaque: form.querySelector('#plaque').value,
                model: form.querySelector('#model').value,
                marque: form.querySelector('#marque').value,
                couleur: form.querySelector('#couleur').value,
                charge_utile: form.querySelector('#charge').value,
                mise_en_circulation: form.querySelector('.circulation').value,
                id_taxe: form.querySelector('#taxe').value,
            };

            //Insertion des données
            await newVehicule(body);
        } else if (target.matches('.btn-new-propriete-article')) {
            const body = {
                id_article_budgetaire: form.querySelector('#articles').value,
                id_contribuable: form.querySelector('#contribuable').value,
                id_categorie: form.querySelector('#categorie').value,
                id_taxe: form.querySelector('#taxe').value,
            };

            await newVehicule(body);
        }
    });
}

//2. Update vehicule
if (dom.containerTable) {
    dom.containerTable.addEventListener('click', async (e) => {
        //e.preventDefault();
        const target = e.target;

        if (target.matches('.btn-update-vehicule')) {
            const form = target.closest('.form-update-vehicule');
            const id = form.dataset.id;

            //Body
            const body = {
                id_article_budgetaire: form.querySelector('.article').value,
                id_categorie: form.querySelector('.category').value,
                id_contribuable: form.querySelector('.contribuable').value,
                numero_chassis: form.querySelector('.chassis').value,
                numero_plaque: form.querySelector('.plaque').value,
                model: form.querySelector('.model').value,
                marque: form.querySelector('.marque').value,
                couleur: form.querySelector('.couleur').value,
                charge_utile: form.querySelector('.charge').value,
                mise_en_circulation: form.querySelector('.circulation').value,
            };

            //Message d'alerte si la valeur est vide
            if (body.id_article_budgetaire === '' || body.id_categorie === '' || body.id_contribuable === '' ||
                body.numero_plaque === '' || body.numero_chassis === '' || body.model === '' || body.couleur === '' ||
                body.charge_utile === '' || body.mise_en_circulation === '')
            {
                const container = document.querySelector(`.container-alert-${id}`);
                alert('alert-danger', 'Veillez remplir tous les champs importants', container);
                return false;
            }

            const vehiculeUpdated = await updateVehicule(body, id);
            if (vehiculeUpdated === 1) {
                await renderTableVehicules();
                removeModal();
            }

        }
    });
}

//4. Restore or disable
if (dom.containerTable) {
    dom.containerTable.addEventListener('click', async (event) => {
        const btn = event.target;
        let contBtn
        if (btn.closest('.btn-restore-vehicule')) {
            contBtn = btn.closest('.cont-button-veh')
            spinnerButton(contBtn)
            const id = btn.closest('.btn-restore-vehicule').dataset.row;
            const body = {active: 'true'};

            await stateVehicule(body, id);
            await renderTableVehicules();

        } else if (btn.closest('.btn-delete-vehicule')) {
            contBtn = btn.closest('.cont-button-veh')
            spinnerButton(contBtn)
            const id = btn.closest('.btn-delete-vehicule').dataset.row;
            const body = {active: 'false'};

            await stateVehicule(body, id);
            await renderTableVehicules();
        }
    });
}

/***************************************************************************************
 * TAXATION*/

const renderTableTaxation = async () => {
    //Render table
    const taxations = await allTaxation();
    const comptes = JSON.parse(dom.containerTable.dataset.compte);
    await listTaxation(taxations, comptes, dom.containerTable,userInfo);
    await table();
};

//Affichage de la liste lors du chargement de la page
window.addEventListener('load', async () => {
    if (window.location.pathname === '/home/all-taxation') {
        //Render table
        await renderTableTaxation();
    }

    if (window.location.pathname === '/home/new-taxation') {

        //Rendre les taxes par le service selectionné
        if (dom.service) {
            /*Nous executons la fonction au cas ou un élément est déjà
            selectionné par defaut lors du chargement de la page*/
            const idService = dom.service.value;
            if(idService!=='') await renderTaxeByService(idService,dom.taxe);
            else dom.taxe.innerHTML=''

            /*Nous executons la fonction au cas ou un élément est selectionné*/
            dom.service.addEventListener('change', async (event) => {
                const idService = dom.service.value;
                if(idService!=='') await renderTaxeByService(idService,dom.taxe);
                else dom.taxe.innerHTML=''
            });
        }

        //Initialisation objet vide
        let body = {};

        //Affichages des formulaires
        if (dom.formNewTaxation) {
            dom.formNewTaxation.addEventListener('click', async (e) => {
                //e.preventDefault()
                const target = e.target;
                //2. Affichage du formulaire selon la taxe
                if (target.matches('.sw-btn-next')) {

                    // Declarations variables
                    const service = document.getElementById('service');
                    const contribuable = document.getElementById('contribuable');
                    const taxe = document.getElementById('taxe');
                    const taux = JSON.parse(dom.containerFormulaireTaxation.dataset.taux);

                    if (contribuable.value !== '' && taxe.value !== '') {

                        const contribuableDb = await oneContibuable(contribuable.value);
                        const vehicules = await allVehicules(contribuable.value, service.value);
                        const autresProprietes = await allProprieteNoVehicules(contribuable.value, service.value);

                        //Affichage des formulaires
                        await formulaire(dom.containerFormulaireTaxation, contribuableDb, vehicules, autresProprietes,
                            service.value, taxe.value, taux);
                    }
                }
                if (target.matches('.btn-validate-taxation')) {

                    //Container du formulaire
                    const form = dom.formNewTaxation;

                    const proprietesInputs = form.querySelectorAll('.propriete');
                    const proprietesChecked = Array.from(proprietesInputs).filter(el => el.checked);

                    //Message d'erreur si aucune proprieté n'est selectionné
                    if (proprietesChecked.length === 0) {
                        alert('alert-danger', 'Veillez choisir au moins une proprieté', dom.containerAlert);
                        return false;
                    }

                    //Body
                    body = {
                        exercice: form.querySelector('.exercice').value,
                        id_taxe: form.querySelector('#taxe').value,
                        nom_declarant: form.querySelector('#nom_declarant').value,
                        telephone_declarant: form.querySelector('#telephone_declarant').value,
                        id_contribuable: form.querySelector('#contribuable').value,
                        echeance: form.querySelector('#echeance').value,
                        penalite: form.querySelector('#penalite').value,
                        taux: form.querySelector('#taux').value,
                        devise: form.querySelector('#devise').value,
                    };

                    //Message d'erreur au cas de no remplissage des champs importants
                    if (body.exercice === '' || body.taxe === '' || body.nom_declarant === '' ||
                        body.telephone_declarant === '' || body.id_contribuable === '' || body.echeance === '' ||
                        body.devise === '' || body.taux === '' || body.exercice === '')
                    {
                        alert('alert-danger', 'Veillez remplir tous les champs marqués obligatoire',
                            dom.containerAlert);
                        return false;
                    }

                    //Suppression du message d'erreur
                    clearHtml(dom.containerAlert);

                    //Proprietes + Montant
                    const proprieteAndMontant = proprietesChecked.map(async (el) => {
                        const article = el.dataset.article;
                        const categorie = el.dataset.categorie;
                        const designation = el.dataset.designation;
                        const newObject = {};
                        const montant = await montantTaxation(body.id_taxe, article, categorie, body.echeance);
                        if (montant === undefined) {
                            alert('alert-danger',
                                `Aucun tarif n'est encore défini pour l'article  <strong>${designation}</strong> pour ce type d'opération`,
                                dom.containerAlert);
                            return false;
                        }

                        newObject['propriete'] = el.value;
                        newObject['codeTaxe'] = montant.code_taxe;
                        newObject['devise'] = montant.devise;
                        newObject['montantArticle'] = montant.montant;
                        newObject['taxe'] = montant.taxe;
                        newObject['article'] = designation;
                        newObject['id_article'] = montant.id_article_budgetaire;
                        return newObject;
                    });
                    const resultatMontantPropriete = await Promise.all(proprieteAndMontant);


                    //Arrêt de la fonction si l'un des articles selectionné n'a pas encore un tarif
                    if (resultatMontantPropriete[0] === false) {
                        return false;
                    }

                    //Montant global
                    const valeurInitiale = 0;
                    const montantGlobal = resultatMontantPropriete.reduce((accumulateur, el) => {
                        const montantFormat = el.devise==='CDF'?(el.montantArticle/body.taux).toFixed(2):el.montantArticle
                        return accumulateur + parseFloat(montantFormat);
                    }, valeurInitiale);

                    //montant global + penalite
                    const calculPenalite = montantGlobal * Number(body.penalite) / 100;
                    const montantGlobalAndPenalite = calculPenalite + montantGlobal;

                    //Ajout des proprietés au body
                    body.montant = resultatMontantPropriete;
                    body.sumMontant = montantGlobal;
                    body.montantTotal = montantGlobalAndPenalite;

                    //Suppression du message au cas du success
                    resumeTaxation(dom.containerFormulaireTaxation, body);

                }
                //Insertion
                if (target.matches('.confirme')) {
                    await newTaxation(body);
                }
            });

        }
    }
});

// if (dom.contribuables) {
dom.contribuables.forEach(el => {
    el.addEventListener('change', async () => {
        const idContribuable = el.value;
        await getVehicules(idContribuable);
    });
});

//5. Desactive taxation
if (dom.containerTable) {
    dom.containerTable.addEventListener('click', async (e) => {
        //e.preventDefault();
        if (e.target.closest('.btn-delete-taxation')) {
            const id = e.target.closest('.btn-delete-taxation').dataset.id;
            const body = {active: 'false'};
            await desableTaxation(body, id);
            //Render table
            await renderTableTaxation();
        } else if (e.target.closest('.btn-restore-taxation')) {
            const id = e.target.closest('.btn-restore-taxation').dataset.id;
            const body = {active: 'true'};
            await desableTaxation(body, id);
            //Render table
            await renderTableTaxation();
        }

    });
}

//6.Validation taxation
if (dom.containerTable) {
    dom.containerTable.addEventListener('click', async (event) => {
        //event.preventDefault();
        const btn = event.target;
        if (btn.matches('.btn-valid-taxation')) {
            const form = btn.closest('.form-validation-taxation');
            const id = form.dataset.id;

            if (form.querySelector('.avis').value === 'non favorable' &&
                form.querySelector('.observation-taxe').value !== '')
            {
                const body = {
                    avis: form.querySelector('.avis').value,
                    observation: form.querySelector('.observation-taxe').value
                };
                await brokeTaxation(body, id);
                await renderTableTaxation();
                removeModal();
            } else {
                const body = {
                    id_compte: form.querySelector('.compte').value,
                    avis: form.querySelector('.avis').value,
                    observation: form.querySelector('.observation-taxe').value,
                };
                const taxation = await validateTaxation(body, id);
                if (taxation === 'success') {
                    await renderTableTaxation();
                    removeModal();
                }
            }
        }

    });
}

//Rendre le champ observation à l'avis non favorable
if (dom.containerTable) {
    dom.containerTable.addEventListener('change', (e) => {
        if (e.target.matches('.avis')) {
            const avis = e.target;
            const form = avis.closest('.form-validation-taxation');
            form.querySelector('.observation-taxe').disabled = avis.value !== 'non favorable';
        }
    });
}

/***************************************************************************************
 * ATTESTATION
 * */

const renderTableAttestation = async () => {
    const taxationOrdonnance = await taxationOrd();
    listAttestation(taxationOrdonnance, dom.containerTable);
    table();
};

window.addEventListener('load', async (e) => {
    if (window.location.pathname === '/home/new-attestation') {
        await renderTableAttestation();
    }
});

//1. create
if (dom.containerTable) {
    dom.containerTable.addEventListener('click', async (e) => {
        const target = e.target;
        if (target.matches('.btn-atteste-taxation')) {
            const form = target.closest('.form-new-attestation');
            const containerError = form.querySelector('.container-error');

            //Body
            const body = {
                avis: form.querySelector('.avis').value,
                id_taxation: form.querySelector('.taxation').value,
                montant: form.querySelector('.montant').value,
                montant_global: form.querySelector('.montant_global').value,
                montant_penalite: form.querySelector('.penalite').value,
                numero_bordereau: form.querySelector('.numero_bordereau').value,
                date_attestation: form.querySelector('.date_attestation').value,
                devise: form.querySelector('.devise').value,
            };

            if (body.avis === 'defavorable') {
                alert('alert-danger', `Cet attestation n'est pas validé compte tenu de votre avis defavorable`,
                    dom.containerAlert);
                return false;
            }

            //Insert
            const res = await newAttestation(body, containerError);
            if (res) {
                await renderTableAttestation();
                removeModal();
            }
        }
    });
}

/*************************************************************************************
 * USER
 * */

const renderTableUser = async ()=>{
    const users = await allUser();
    const sites = await allSites();
    const fonctions = await allFonctions();
    templateUser(users,sites,fonctions,dom.containerTable)
    table()
}

//render table when window refresh
if (window.location.pathname === '/home/all-user') {
    window.addEventListener('load', async () => {
        spinnerTable(dom.containerTable)
        await renderTableUser();
    });
}

//1. creation
if (dom.formNewUser) {
    dom.formNewUser.addEventListener('submit', async (event) => {
        event.preventDefault();
        const body = {
            nom: dom.nom.value,
            prenom: dom.prenom.value,
            matricule: dom.matricule.value,
            id_fonction: dom.fonction.value,
            id_site: dom.site.value,
            sexe: dom.sexe.value,
            password: dom.password.value,
            taxer: dom.taxer.checked,
            apurer: dom.apurer.checked,
            encoder: dom.encoder.checked,
            ordonnancer: dom.ordonnancer.checked,
            administrer: dom.admin.checked,
            rapport: dom.rapport.checked,
            imprimer: dom.rapport.checked,
            gerer: dom.gerer.checked,
            stocker: dom.stocker.checked,
        };
        await newUser(body);
    });
}

//2. Mise à jour
if (dom.containerTable) {
    dom.containerTable.addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.target;
        if (form.matches('.form-update-user')) {

            const id = form.dataset.id;
            const container = form.querySelector('.container-error')

            //1. Get data form
            const body = {
                nom: form.querySelector('.nom').value,
                prenom: form.querySelector('.prenom').value,
                matricule: form.querySelector('.matricule').value,
                sexe: form.querySelector('.sexe').value,
                id_site: form.querySelector('.site').value,
                id_fonction: form.querySelector('.fonction').value,
                apurer: form.querySelector('.apurer').checked,
                taxer: form.querySelector('.taxer').checked,
                encoder: form.querySelector('.encoder').checked,
                ordonnancer: form.querySelector('.ordonnancer').checked,
                administrer: form.querySelector('.admin').checked,
                rapport: form.querySelector('.rapport').checked,
                gerer: form.querySelector('.gerer').checked,
                imprimer: form.querySelector('.imprimer').checked,
                stocker: form.querySelector('.stocker').checked,
            };

            //2. Update
            const user = await userUpdate(body, id, container);
            if(user==='success'){
                //3.Render table
                await renderTableUser();

                //4. remove modal
                removeModal();
            }
        }

    });
}

//4. Restore user
if (dom.containerTable) {
    dom.containerTable.addEventListener('click', async (event) => {
        const btn = event.target;
        let contBtn
        if (btn.closest('.btn-restore-user')) {
            contBtn = btn.closest('.cont-button-user')
            spinnerButton(contBtn)
            const id = btn.closest('.btn-restore-user').dataset.row;
            const body = {active: 'true'};

            //1. Restore user
            await stateUser(body, id);

            //2. Render data
            await renderTableUser();

        } else if (btn.closest('.btn-delete-user')) {
            contBtn = btn.closest('.cont-button-user')
            spinnerButton(contBtn)
            const id = btn.closest('.btn-delete-user').dataset.row;
            const body = {active: 'false'};

            //1. Restore user
            await stateUser(body, id);

            //2. Render data
            await renderTableUser();
        }
    });

}

/*************************************************************************************
 * USER API
 * */

if (dom.formNewUserApi) {
    dom.formNewUserApi.addEventListener('submit', async (e) => {
        e.preventDefault();

        //1. Get data form
        const body = {
            nom: dom.formNewUserApi.querySelector('#nom-api').value,
            service: dom.formNewUserApi.querySelector('#service').value,
            motif: dom.formNewUserApi.querySelector('#motif').value,
            email: dom.formNewUserApi.querySelector('#email').value,
        };

        //2. Insert
        await createApi(body);

        //3. reset form
        dom.formNewUserApi.reset();

    });
}


/*************************************************************************************
 * SITE
 * */
const renderTableSite = async () => {
    const sites = await allSites();
    const taxes = await allTaxe();
    const communes = JSON.parse(dom.containerTable.dataset.commune);
    listSite(sites, communes, taxes, dom.containerTable);
    table();
};

window.addEventListener('load', async (e) => {
    if (window.location.pathname === '/home/site') {
        spinnerTable(dom.containerTable)
        await renderTableSite();
    }
});

//1. Création
if (dom.formNewSite) {
    dom.formNewSite.addEventListener('submit', async (event) => {
        event.preventDefault();
        const body = {
            province: dom.formNewSite.querySelector('#province').value,
            id_commune: dom.formNewSite.querySelector('#commune-site').value,
            lieu: dom.formNewSite.querySelector('#lieu').value,
            code: dom.formNewSite.querySelector('#code').value,
            operation: dom.formNewSite.querySelector('#operation').value
        };

        //1. Création site
        const site = await createOne(body);
        if (site) {
            await renderTableSite();
        }
    });
}

//3. Mise à jour
if (dom.containerTable) {
    dom.containerTable.addEventListener('click', async (e) => {
        const target = e.target;
        if (target.matches('.btn-update-site')) {
            const form = target.closest('.form-update-site');
            const id = form.dataset.id;
            const container = form.querySelector('.container-error')

            //Body
            const body = {
                province: form.querySelector('.province').value,
                id_commune: form.querySelector('.commune-site').value,
                lieu: form.querySelector('.lieu').value,
                code: form.querySelector('.code').value,
                operation: form.querySelector('.operation').value,
            };

            const site = await updateSite(body, id, container);
            if(site){
                await renderTableSite()
                removeModal()
            }
        }
    });
}

//5. Restore or delete
if (dom.containerTable) {
    dom.containerTable.addEventListener('click', async (event) => {
        const btn = event.target;
        let contBtn
        if (btn.closest('.btn-restore-site')) {
            contBtn = btn.closest('.cont-button-site')
            spinnerButton(contBtn)
            const id = btn.closest('.btn-restore-site').dataset.row;
            const body = {active: 'true'};
            const site = await deleteSite(body, id);
            if(site){
                await renderTableSite()
            }
        } else if (btn.closest('.btn-delete-site')) {
            contBtn = btn.closest('.cont-button-site')
            spinnerButton(contBtn)
            const id = btn.closest('.btn-delete-site').dataset.row;
            const body = {active: 'false'};
            const site = await deleteSite(body, id);
            if(site){
                await renderTableSite()
            }
        }
    });
}

/*************************************************************************************
 * SERVICE
 * */

//1. Création
if (dom.formNewService) {
    dom.formNewService.addEventListener('submit', async (event) => {
        event.preventDefault();

        const body = {
            designation: dom.formNewService.querySelector('#designation').value,
            ministere: dom.formNewService.querySelector('#ministere').value,
            description: dom.formNewService.querySelector('#description').value,
        };

        await createService(body);
        //Reset form insertion
        dom.formNewService.reset();

        let current_page = 1;
        let rows = 10;

        //2. Get sites
        const services = await allServices();

        //Rendu tu tableau quand on fait la recherche
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', () => {
            search(services, searchInput.value, dom.contentTable, rows, current_page);
        });

        //Rendu du tableau par defaut
        displayService(services, dom.contentTable, rows, current_page);
        const pagination = document.getElementById('pagination');
        paginationService(services, pagination, rows, current_page, dom.contentTable);
    });
}

//2. Show all servicie by default
window.addEventListener('load', async () => {
    if (window.location.pathname === '/home/service') {

        //2. Get sites
        const services = await allServices();

        const searchInput = document.getElementById('search');

        let current_page = 1;
        let rows = 10;

        searchInput.addEventListener('input', () => {
            searchService(services, searchInput.value, dom.contentTable, rows, current_page);
        });

        displayService(services, dom.contentTable, rows, current_page);
        const pagination = document.getElementById('pagination');
        paginationService(services, pagination, rows, current_page, dom.contentTable);

    }
});

//3. Mise à jour
if (dom.contentTable) {
    dom.contentTable.addEventListener('submit', async (e) => {
        const form = e.target;
        e.preventDefault();
        if (form.matches('.form-update-service')) {
            const id = form.dataset.id;

            //1. Données du formulaire
            const body = {
                designation: form.querySelector('.designation').value,
                ministere: form.querySelector('.ministere').value,
                description: form.querySelector('.description').value,
            };

            //2. Mise à jour
            await updateService(body, id);

            let current_page = 1;
            let rows = 10;

            //2. Get sites
            const services = await allServices();

            //Rendu tu tableau quand on fait la recherche
            const searchInput = document.getElementById('search');
            searchInput.addEventListener('input', () => {
                searchService(services, searchInput.value, dom.contentTable, rows, current_page);
            });

            //Rendu du tableau par defaut
            displayService(services, dom.contentTable, rows, current_page);
            const pagination = document.getElementById('pagination');
            paginationService(services, pagination, rows, current_page, dom.contentTable);

            //remove modal
            removeModal();
        }
    });
}

//5. Restore or delete
if (dom.contentTable) {
    dom.contentTable.addEventListener('click', async (event) => {
        const btn = event.target;
        if (btn.closest('.btn-restore-service')) {
            const id = btn.closest('.btn-restore-service').dataset.row;
            const body = {active: 'true'};
            await restoreOrDisableService(body, id);

        } else if (btn.closest('.btn-delete-service')) {
            const id = btn.closest('.btn-delete-service').dataset.row;
            const body = {active: 'false'};
            await restoreOrDisableService(body, id);

        }
    });

}

/*************************************************************************************
 * TARIF
 * */

const renderTableTarif = async()=>{
    //Get datas
    const categories = await allCaterogie();
    const articles = await allArticle();
    const taxes = await allTaxe();
    const tarifs = await getAllTarif();
    listTarif(tarifs,taxes,categories,articles,dom.containerTable)
    select2()
    table()
}

//1. Création
if (dom.formNewTarif) {
    dom.formNewTarif.addEventListener('submit', async (e) => {
        e.preventDefault();
        const periodicite = dom.formNewTarif.querySelector('#periodicite')
        let periode
        if(periodicite.value!==''){
            periode = periodicite.value
        }
        else{
            periode = dom.formNewTarif.querySelector('#echeance-tarif').value
        }

        //1. Obtention des données du formulaire
        const body = {
            id_taxe: dom.formNewTarif.querySelector('#taxe-tarif').value,
            id_categorie: dom.formNewTarif.querySelector('#categorie').value,
            id_article_budgetaire: dom.formNewTarif.querySelector('#article').value,
            exercice: dom.formNewTarif.querySelector('#exercice').value,
            echeance: periode,
            montant: dom.formNewTarif.querySelector('#montant').value,
            devise: dom.formNewTarif.querySelector('#devise').value,
        };

        //2. Insertion des données
        await createTarif(body);

        //3. Reinitialisation du formulaire
        dom.formNewTarif.reset();
        await renderTableTarif();
    });
}

//2. Affichage du tableau par defaut
window.addEventListener('load', async () => {
    if (window.location.pathname === '/home/tarif') {
        spinnerTable(dom.containerTable)
        await renderTableTarif();
        const containerForm = document.querySelector('.container-form')
        containerForm.addEventListener('change', async(e)=>{
            const target = e.target
            if(target.matches('#taxe-tarif')){
                const idTaxe = target.value
                const taxes = await allTaxe();
                const containerEcheance = containerForm.querySelector('#echeance-tarif')
                const containerPeriodicite = containerForm.querySelector('#periodicite')
                const exercice = containerForm.querySelector('#exercice')
                renderEcheance(idTaxe,taxes,containerEcheance,containerPeriodicite)
                renderExercice(idTaxe,taxes,exercice)
            }
        })

        dom.containerTable.addEventListener('change', async(e)=>{
            const target = e.target
            if(target.matches('.taxe-tarif')){
                const idTaxe = target.value
                const taxes = await allTaxe();
                const containerEcheance = dom.containerTable.querySelector('.echeance-tarif')
                const containerPeriodicite = dom.containerTable.querySelector('.periodicite')
                const exercice = dom.containerTable.querySelector('.exercice-tarif')
                renderEcheance(idTaxe,taxes,containerEcheance,containerPeriodicite)
                renderExercice(idTaxe,taxes,exercice)
            }
        })
    }
});

//3. Mise a jour
if (dom.containerTable) {
    dom.containerTable.addEventListener('click', async (e) => {
        //e.preventDefault();
        const target = e.target;
        if (target.matches('.btn-update-tarif')) {
            const form = target.closest('.form-update-tarif')
            const id = form.dataset.id;
            const container = form.querySelector('.container-error')

            const periodicite = form.querySelector('.periodicite')
            let periode
            if(periodicite.value!==''){
                periode = periodicite.value
            }
            else{
                periode = form.querySelector('.echeance-tarif').value
            }

            const body = {
                id_taxe: form.querySelector('.taxe-tarif').value,
                id_categorie: form.querySelector('.categorie').value,
                id_article_budgetaire: form.querySelector('.article').value,
                exercice: form.querySelector('.exercice-tarif').value,
                echeance: periode,
                montant: form.querySelector('.montant').value,
                devise: form.querySelector('.devise').value,
            };

            const update = await updateTarif(body, id,container);

            if (update === 1) {
                await renderTableTarif();
                removeModal();
            }
        }
    });
}

//4. Restore or delete
if (dom.containerTable) {
    dom.containerTable.addEventListener('click', async (event) => {
        const btn = event.target;
        if (btn.closest('.btn-restore-tarif')) {
            const contBT = btn.closest('.cont-button-tarif')
            spinnerButton(contBT)
            const id = btn.closest('.btn-restore-tarif').dataset.row;
            const body = {active: 'true'};
            await stateTarif(body, id);
            await renderTableTarif();

        } else if (btn.closest('.btn-delete-tarif')) {
            const contBT = btn.closest('.cont-button-tarif')
            spinnerButton(contBT)
            const id = btn.closest('.btn-delete-tarif').dataset.row;
            const body = {active: 'false'};
            await stateTarif(body, id);
            await renderTableTarif();
        }
    });
}

/*************************************************************************************
 * TAXE
 * */

const renderTableTaxe = async () => {
    const taxes = await allTaxe();
    const types = JSON.parse(dom.containerTable.dataset.type);
    const services = JSON.parse(dom.containerTable.dataset.service);
    //render table
    template(taxes, dom.containerTable, types, services);
    table();
    date();
};

//Show list by default
window.addEventListener('load', async () => {
    if (window.location.pathname === '/home/taxe') {
        spinnerTable(dom.containerTable)
        await renderTableTaxe();
    }
});

//Create
if (dom.formNewTaxe) {
    dom.formNewTaxe.addEventListener('submit', async (e) => {
        e.preventDefault();
        const periodiciteStart = document.getElementById('periodicite-start');
        const periodiciteEnd = document.getElementById('periodicite-end');
        let dateDif;
        let duree;
        let year = []

        if (periodiciteStart.value !== '' || periodiciteEnd.value !== '') {
            const day1 = dayjs(periodiciteEnd.value);
            const day2 = dayjs(periodiciteStart.value);
            dateDif = day1.diff(day2, 'month');
            duree = `${day2.format('YYYY/MM/DD')}-${day1.format('YYYY/MM/DD')}`;

            //Obtenir le nombre d'années(exercices)
            const numberYear = day1.diff(day2, 'year');
            const dateStart = new Date(periodiciteStart.value).getFullYear()
            let x = 0
            while(x<=numberYear){
                year.push(dateStart+x)
                x++
            }
        }

        if(dateDif<=0){
            alert('alert-danger', 'La durée minimun pour la périodicité est d\'un mois et maximun est d\'un an', dom.containerAlert)
            return false
        }

        //Body
        const body = {
            type: document.getElementById('type').value,
            service: document.getElementById('service').value,
            designation: document.getElementById('designation').value,
            description: document.getElementById('description').value,
            delai: document.getElementById('delai').value,
            periodicite: duree,
            duree: dateDif,
            exercice:year.join(',')
        };

        //Post
        const newTaxe = await createTaxe(body);
        if (newTaxe) {
             //4. Render table
             await renderTableTaxe();
        }
    });
}

//Mise a jour
if (dom.containerTable) {
    dom.containerTable.addEventListener('click', async (e) => {
        /*Nous avons utilisé l'événement click au lieu de submit pour eviter quelques bugs
         * car souvent la propagation d'événement avec submit bloque dans certaines situations,
         * vu qu'on a pas encore compris le pourquoi nous utilisons le CLICK*/
       // e.preventDefault();

        if (e.target.closest('.btn-update-taxe')) {
            const btn = e.target.closest('.btn-update-taxe');
            const row = btn.closest('.row-data');

            const periodiciteStart = row.querySelector('.periodicite-start');
            const periodiciteEnd = row.querySelector('.periodicite-end');
            let dateDif;
            let duree;
            let year = []

            if (periodiciteStart.value !== '' || periodiciteEnd.value !== '') {
                const day1 = dayjs(periodiciteEnd.value);
                const day2 = dayjs(periodiciteStart.value);
                dateDif = day1.diff(day2, 'month');
                duree = `${day2.format('YYYY/MM/DD')}-${day1.format('YYYY/MM/DD')}`;

                //Obtenir le nombre d'années(exercices)
                const numberYear = day1.diff(day2, 'year');
                const dateStart = new Date(periodiciteStart.value).getFullYear()
                let x = 0
                while(x<=numberYear){
                    year.push(dateStart+x)
                    x++
                }
            }

            if(dateDif<=0){
                alert('alert-danger', 'La durée minimun pour la périodicité est d\'un mois et maximun est d\'un an', dom.containerAlert)
                return false
            }

            const body = {
                type: row.querySelector('.type').value,
                service: row.querySelector('.service').value,
                designation: row.querySelector('.designation').value,
                description: row.querySelector('.description').value,
                delai: row.querySelector('.delai').value,
                periodicite: duree,
                duree: dateDif,
                exercice:year.join(',')
            };

            //Update
            const rowUp = await updateTaxe(body, row.dataset.row);
            if (rowUp === 1) {
                //render table
                await renderTableTaxe();
                //remove modal
                removeModal();
            }
        }
    });
}

//State
if (dom.containerTable) {
    dom.containerTable.addEventListener('click', async (event) => {
        const btn = event.target;
        let contBtn
        if (btn.closest('.btn-restore-taxe')) {
            contBtn = btn.closest('.cont-button-tax')
            spinnerButton(contBtn)
            //1. Get id
            const id = btn.closest('.btn-restore-taxe').dataset.id;
            //2. Body
            const body = {active: 'true'};
            //3. Update
            await stateTaxe(body, id);
            //4. Render table
            await renderTableTaxe();

        } else if (btn.closest('.btn-delete-taxe')) {
            contBtn = btn.closest('.cont-button-tax')
            spinnerButton(contBtn)
            //1. Get id
            const id = btn.closest('.btn-delete-taxe').dataset.id;
            //2. body
            const body = {active: 'false'};
            //3. Update
            await stateTaxe(body, id);
            //4. Render table
            await renderTableTaxe();
        }
    });
}

/*************************************************************************************
 * ARTICLE
 * */
const renderTableArticle = async () => {
    const articles = await allArticle();
    const types = JSON.parse(dom.containerTable.dataset.type);
    //render table
    templateArticle(articles, dom.containerTable, types);
    table();
};

//Show list by default
window.addEventListener('load', async () => {
    if (window.location.pathname === '/home/article') {
        spinnerTable(dom.containerTable)
        await renderTableArticle();
    }
});

//Create
if (dom.formNewArticle) {
    dom.formNewArticle.addEventListener('submit', async (e) => {
        e.preventDefault();

        //Body
        const body = {
            type: document.getElementById('type').value,
            designation: document.getElementById('designation').value,
            description: document.getElementById('description').value,
        };

        //Post
        const newArticle = await createArticle(body);
        if (newArticle) {
            //4. Render table
            await renderTableArticle();
        }
    });
}

//Mise a jour
if (dom.containerTable) {
    dom.containerTable.addEventListener('click', async (e) => {
        /*Nous avons utilisé l'événement click au lieu de submit pour eviter quelques bugs
         * car souvent la propagation d'événement avec submit bloque dans certaines situations,
         * vu qu'on a pas encore compris le pourquoi nous utilisons le CLICK*/
        //e.preventDefault();

        if (e.target.closest('.btn-update-article')) {
            const btn = e.target.closest('.btn-update-article');
            const row = btn.closest('.row-data');

            const body = {
                type: row.querySelector('.type').value,
                designation: row.querySelector('.designation').value,
                description: row.querySelector('.description').value,
            };

            //Update
            const rowUp = await updateArticle(body, row.dataset.row);
            if (rowUp === 1) {
                //render table
                await renderTableArticle();
                //remove modal
                removeModal();
            }

        }
    });
}

//State
if (dom.containerTable) {
    dom.containerTable.addEventListener('click', async (event) => {
        const btn = event.target;
        let contBtn
        if (btn.closest('.btn-restore-article')) {
            contBtn = btn.closest('.cont-button-art')
            spinnerButton(contBtn)
            //1. Get id
            const id = btn.closest('.btn-restore-article').dataset.id;
            //2. Body
            const body = {active: 'true'};
            //3. Update
            await stateArticle(body, id);
            //4. Render table
            await renderTableArticle();

        } else if (btn.closest('.btn-delete-article')) {
            contBtn = btn.closest('.cont-button-art')
            spinnerButton(contBtn)
            //1. Get id
            const id = btn.closest('.btn-delete-article').dataset.id;
            //2. body
            const body = {active: 'false'};
            //3. Update
            await stateArticle(body, id);
            //4. Render table
            await renderTableArticle();
        }
    });
}

/*************************************************************************************
 * TAUX
 * */
const renderTableTaux = async () => {
    const taux = await allTaux();
    //render table
    templateTaux(taux, dom.containerTable);
    table();
};

//Show list by default
window.addEventListener('load', async () => {
    if (window.location.pathname === '/home/taux') {
        await renderTableTaux();
    }
});

if (dom.formNewTaux) {
    dom.formNewTaux.addEventListener('submit', async (e) => {
        e.preventDefault();

        //Body
        const body = {
            valeur: document.getElementById('valeur').value,
            devise: document.getElementById('devise').value,
        };

        //Post
        const newTaux = await createTaux(body);
        if (newTaux) {
            //4. Render table
            await renderTableTaux();
        }
    });
}

/*************************************************************************************
 * Notification
 * */
window.addEventListener('load', async () => {
    if (document.getElementById('notification-modal')) {
        await renderNotification();
    }
});

//Delete notification
if (dom.containerNotification) {
    dom.containerNotification.addEventListener('click', async (event) => {
        const btn = event.target;
        if (btn.closest('.btn-delete-notification')) {
            //1. Get id
            const id = btn.closest('.btn-delete-notification').dataset.id;
            //2. Body
            const body = {active: 'false'};
            //3. Update
            await stateNotification(body, id);
            //4. Render table
            await renderNotification();

        }
    });
}

if (dom.containerNotification) {
    dom.containerNotification.addEventListener('click', async (event) => {
        const btn = event.target;
        if (btn.matches('.btn-read-notification')) {
            //1. Get id
            const id = btn.dataset.id;
            //2. Body
            const body = {readed: 1};
            //3. Update
            await readNotification(body, id);
            //4. Render table
            await renderNotification();
        }
    });
}

/*************************************************************************************
 * NOTE
 * */
const renderTableNote = async () => {
    const notes = await listNotesCalcul();
    //render table
    listNote(notes, dom.containerTable);
    table();
};

window.addEventListener('load', async () => {
    if (window.location.pathname === '/home/note') {
        await renderTableNote();
        dom.containerTable.addEventListener('click', async (e) => {
            if (e.target.matches('.see-note')) {
                // window.open(`/home/note/doc/${btn.dataset.id}`, '_blank')
                window.location = `/home/note/doc/${e.target.dataset.id}`;
            }
        });
    }
});
