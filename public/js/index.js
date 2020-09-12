import '@babel/polyfill';
import dom from './utils/dom';
import {login, logout} from './login';
import {changePassword} from './changePassword';
import {getCommune} from './getCommune';
import {getQuartiers} from './getQuartier';
import {newPerson} from './newPerson';
import {updatePerson} from './updatePerson';
import {desable, desableCar} from './desable';
import {newVehicule, updateVehicule} from './newVehicule';
import {getarticle, getTaxe} from './getArticles';
import {getTaxe2, getVehicules} from './utils/select';
import {newTaxation, updateTaxation, desableTaxation, validateTaxation} from './newTaxation';
import {newAttestation} from './attestation';

//Login
if (dom.formLogin) {
    dom.formLogin.addEventListener('submit', async (event) => {
        event.preventDefault();
        await login(dom.login.value, dom.password.value);
    });
}

//Logout
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

//Get all commune by district
if (dom.district) {
    dom.district.addEventListener('change', async (e) => {
        const idDistrict = dom.district.value;
        await getCommune(idDistrict);
    });
}

//Get articles budgetaires by type objet
if (dom.type) {
    dom.type.addEventListener('change', async (event) => {
        const idType = dom.type.value;
        await getarticle(idType);
    });
}

if (dom.type) {
    dom.type.addEventListener('change', async (event) => {
        const idTaxe = dom.type.value;
        await getTaxe(idTaxe);
    });
}

if (dom.types) {
    Array.from(dom.types)
    .forEach(el => {
        el.addEventListener('change', async (event) => {
            const idType = el.value;
            console.log(idType);
            await getarticle(idType);
        });
    });
}

if (dom.types) {
    Array.from(dom.types)
    .forEach(el => {
        el.addEventListener('change', async (event) => {
            const idTaxe = el.value;
            await getTaxe(idTaxe);
        });
    });
}

//Get Taxe by type objet

//Get all commune by district when to update
if (dom.districtAr) {
    Array.from(dom.districtAr)
    .forEach(el => {
        el.addEventListener('change', async (event) => {
            const idDistrict = el.value;
            await getCommune(idDistrict);
        });
    });
}

//Get all quartier by commune
if (dom.commune) {
    dom.commune.addEventListener('change', async () => {
        const idCommune = dom.commune.value;
        await getQuartiers(idCommune);
    });
}

//Get all quartier by commune when to update
if (dom.communeAr) {
    Array.from(dom.communeAr)
    .forEach(el => {
        el.addEventListener('change', async (event) => {
            const idCommune = el.value;
            await getQuartiers(idCommune);
        });
    });
}

//New Person
if (dom.formNewPerson) {
    dom.formNewPerson.addEventListener('submit', async (event) => {
        event.preventDefault();

        const body = {
            nom: dom.nomPersonne.value,
            telephone: dom.telephone.value,
            ville: dom.ville.value,
            id_district: dom.district.value,
            id_commune: dom.commune.value,
            id_quartier: dom.quartier.value,
            avenue: dom.avenue.value,
            numero: dom.numero.value,
            observation: dom.observation.value,
        };

        await newPerson(body);
    });

}

//Update person
if (dom.formUpdatePerson) {
    Array.from(dom.formUpdatePerson)
    .forEach((el, index) => {
        el.addEventListener('submit', async (event) => {
            event.preventDefault();

            const id = el.dataset.id;

            const body = {
                nom: document.querySelectorAll('.nom_personne')[index].value,
                telephone: document.querySelectorAll('.telephone')[index].value,
                ville: document.querySelectorAll('.ville')[index].value,
                id_district: document.querySelectorAll('.district')[index].value,
                id_commune: document.querySelectorAll('.commune')[index].value,
                id_quartier: document.querySelectorAll('.quartier')[index].value,
                avenue: document.querySelectorAll('.avenue')[index].value,
                numero: document.querySelectorAll('.numero')[index].value,
                observation: document.querySelectorAll('.observation')[index].value,
            };

            await updatePerson(body, id);
        });
    });
}

//Desable person
if (dom.btnDelete) {
    dom.btnDelete.forEach((el, index) => {
        el.addEventListener('click', async (event) => {
            event.preventDefault();
            const id = dom.rowData[index].dataset.row;
            const body = {active: 'false'};

            console.log(id);
            await desable(body, id);
        });
    });
}

//Delete car
if (dom.btnDeleteCar) {
    dom.btnDeleteCar.forEach((el, index) => {
        el.addEventListener('click', async (event) => {
            event.preventDefault();
            const id = dom.rowData[index].dataset.row;
            const body = {active: 'false'};
            await desableCar(body, id);
        });
    });
}

//New vehicule
if (dom.fomrNewVehicule) {
    dom.fomrNewVehicule.addEventListener('submit', async (event) => {
        event.preventDefault();

        const body = {
            id_article_budgetaire: dom.articles.value,
            id_categorie: dom.category.value,
            id_contribuable: dom.contribuable.value,
            numero_chassis: dom.chassis.value,
            numero_plaque: dom.plaque.value,
            model: dom.model.value,
            marque: dom.marque.value,
            couleur: dom.couleur.value,
            charge_utile: dom.charge.value,
            mise_en_circulation: dom.circulation.value,
            id_taxe: dom.taxe.value,
        };
        console.log(body);
        await newVehicule(body);
    });

}

//Update vehicule
if (dom.formUpdateV) {
    dom.formUpdateV.forEach((el, index) => {
        el.addEventListener('submit', async (event) => {
            event.preventDefault();

            console.log(document.querySelectorAll('.taxes')[index].value);

            const body = {
                id_article_budgetaire: document.querySelectorAll('.article')[index].value,
                id_categorie: document.querySelectorAll('.category')[index].value,
                id_contribuable: document.querySelectorAll('.contribuable')[index].value,
                numero_chassis: document.querySelectorAll('.chassis')[index].value,
                numero_plaque: document.querySelectorAll('.plaque')[index].value,
                model: document.querySelectorAll('.model')[index].value,
                marque: document.querySelectorAll('.marque')[index].value,
                couleur: document.querySelectorAll('.couleur')[index].value,
                charge_utile: document.querySelectorAll('.charge')[index].value,
                mise_en_circulation: document.querySelectorAll('.circulation')[index].value,
                id_taxe: document.querySelectorAll('.taxes')[index].value,
            };

            const id = el.dataset.id;
            await updateVehicule(body, id, index);
        });
    });
}

/***************************************************************************************
 * TAXATION*/

//1. get taxe by service
if (dom.service) {
    dom.service.addEventListener('change', async (event) => {
        const idService = dom.service.value;
        await getTaxe2(idService);
    });
}

if (dom.services) {
    dom.services.forEach(el => {
        el.addEventListener('change', async () => {
            const idService = el.value;
            await getTaxe2(idService);
        });
    });
}

//2. get vehicule by contribuable
if (dom.contribuable) {
    dom.contribuable.addEventListener('input', async () => {
        const idContribuable = dom.contribuable.value;
        await getVehicules(idContribuable);
    });
}

if (dom.contribuables) {
    dom.contribuables.forEach(el => {
        el.addEventListener('change', async () => {
            const idContribuable = el.value;
            await getVehicules(idContribuable);
        });
    });
}

//3. Create taxation
if (dom.formNewTaxation) {
    dom.formNewTaxation.addEventListener('submit', async (event) => {
        event.preventDefault();

        const body = {
            id_exercice: dom.exercice.value,
            id_taxe: dom.taxe.value,
            nom_receptionniste: dom.nomReceptionniste.value,
            telephone_receptioniste: dom.telephoneReceptionniste.value,
            id_vehicule: dom.vehicule.value,
            id_contribuable: dom.contribuable.value
        };

        await newTaxation(body);

    });
}

//4. Update taxation
if (dom.formUpdateTaxation) {
    dom.formUpdateTaxation.forEach((el, index) => {
        el.addEventListener('submit', async (event) => {
            event.preventDefault();

            const body = {
                id_taxe: dom.taxes[index].value,
                nom_receptionniste: dom.nomReceptionnistes[index].value,
                telephone_receptioniste: dom.telephoneReceptionnistes[index].value,
                id_vehicule: dom.vehicules[index].value,
                id_contribuable: dom.contribuables[index].value,
            };

            const id = el.dataset.id;

            await updateTaxation(body, id, index);

        });
    });
}

//5. Desactive taxation
if (dom.btnDeleteTaxation) {
    dom.btnDeleteTaxation.forEach((el, index) => {
        el.addEventListener('click', async (event) => {
            event.preventDefault();
            const id = dom.rowData[index].dataset.row;
            const body = {active: 'false'};
            await desableTaxation(body, id);
        });
    });
}

//6.Validation taxation
if (dom.formValidation) {
    dom.formValidation.forEach((el, index) => {
        el.addEventListener('submit', async (event) => {
            event.preventDefault();
            const body = {
                id_compte: dom.compte[index].value,
                avis: dom.avis[index].value,
            };


            const id = el.dataset.id;
            console.log(body);
            await validateTaxation(body, id, index);

        });
    });
}

/***************************************************************************************
 * ATTESTATION*/
//1. create
if (dom.formNewAttestation) {
    dom.formNewAttestation.addEventListener('submit', async (event) => {
        event.preventDefault();
        const body = {
            avis: document.querySelector('input[name="avis"]:checked').value,
            id_taxation: dom.taxation.value,
            montant: dom.montant.value,
            montant_global: dom.montantGlobal.value,
            montant_penalite: dom.montantPenalite.value,
            numero_bordereau: dom.numeroBordereau.value,
            date_attestation:dom.dateAttestation.value
        };

        await newAttestation(body);
        console.log(body);
    });
}
