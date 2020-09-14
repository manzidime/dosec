import '@babel/polyfill';
import dom from './utils/dom';
import {login, logout} from './login';
import {changePassword} from './changePassword';
import {newPerson} from './newPerson';
import {updatePerson} from './updatePerson';
import {desable, desableCar} from './desable';
import {newVehicule, updateVehicule} from './newVehicule';
import {getTaxe2, getVehicules, communeByDistrict, quartiersByCommune, articleBytype} from './utils/select';
import {newTaxation, updateTaxation, desableTaxation, validateTaxation} from './newTaxation';
import {newAttestation} from './attestation';

/**************************************************************************************
 * UTILITIES*/

//1. Get all commune by district
if (dom.district) {
    dom.district.addEventListener('change', async (e) => {
        const idDistrict = dom.district.value;
        await communeByDistrict(idDistrict);
    });
}

//2. Get all commune by district when to update
if (dom.districtAr) {
    Array.from(dom.districtAr)
    .forEach(el => {
        el.addEventListener('change', async (event) => {
            const idDistrict = el.value;
            await communeByDistrict(idDistrict);
        });
    });
}

//3. When all quartier by commune
if (dom.commune) {
    dom.commune.addEventListener('change', async () => {
        const idCommune = dom.commune.value;
        await quartiersByCommune(idCommune);
    });
}

if (dom.commune) {
    dom.commune.addEventListener('click', async () => {
        const idCommune = dom.commune.value;
        await quartiersByCommune(idCommune);
    });
}

//4. Get all quartier by commune when to update
if (dom.communeAr) {
    Array.from(dom.communeAr)
    .forEach(el => {
        el.addEventListener('change', async (event) => {
            const idCommune = el.value;
            await quartiersByCommune(idCommune);
        });
    });
}

if (dom.communeAr) {
    Array.from(dom.communeAr)
    .forEach(el => {
        el.addEventListener('click', async (event) => {
            const idCommune = el.value;
            await quartiersByCommune(idCommune);
        });
    });
}

//5. Get articles budgetaires by type objet
window.addEventListener('load', async (event) => {
    if (dom.type) {
        const id = dom.type.value;
        await articleBytype(id);
    }
});

if (dom.types) {
    Array.from(dom.types)
    .forEach(el => {
        el.addEventListener('change', async (event) => {
            const idType = el.value;
            await articleBytype(idType);
        });
    });
}

if (dom.types) {
    Array.from(dom.types)
    .forEach(el => {
        el.addEventListener('click', async (event) => {
            const idType = el.value;
            await articleBytype(idType);
        });
    });
}

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
                nom: el.querySelector('.nom_personne').value,
                telephone: el.querySelector('.telephone').value,
                ville: el.querySelector('.ville').value,
                id_district: el.querySelector('.district').value,
                id_commune: el.querySelector('.commune').value,
                id_quartier: el.querySelector('.quartier').value,
                avenue: el.querySelector('.avenue').value,
                numero: el.querySelector('.numero').value,
                observation: el.querySelector('.observation').value,
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

//!VEHICULE
//1. New vehicule
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
        };
        await newVehicule(body);
    });
}

//2. Update vehicule
if (dom.formUpdateV) {
    dom.formUpdateV.forEach((el, index) => {
        el.addEventListener('submit', async (event) => {
            event.preventDefault();

            const body = {
                id_article_budgetaire: el.querySelector('.article').value,
                id_categorie: el.querySelector('.category').value,
                id_contribuable: el.querySelector('.contribuable').value,
                numero_chassis: el.querySelector('.chassis').value,
                numero_plaque: el.querySelector('.plaque').value,
                model: el.querySelector('.model').value,
                marque: el.querySelector('.marque').value,
                couleur: el.querySelector('.couleur').value,
                charge_utile: el.querySelector('.charge').value,
                mise_en_circulation: document.querySelector('.circulation').value,
            };

            const id = el.dataset.id;
            await updateVehicule(body, id, index);
        });
    });
}

/***************************************************************************************
 * TAXATION*/

//activation de l'échéance si le controle technique est selectionné
if (dom.taxe || dom.taxes) {
    dom.taxe.addEventListener('change', () => {
        dom.echeance.disabled = dom.taxe.value != 15;
    });

    dom.taxes.forEach((el, index) => {
        dom.echeance[index].disabled = el.value != 15;
    });
}

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

        if (dom.vehicule) {
            const vehicules = Array.from(dom.vehicule.selectedOptions)
            .map(el => {
                return el.value;
            });

            const body = {
                id_exercice: dom.exercice.value,
                id_taxe: dom.taxe.value,
                nom_declarant: dom.nomDeclarant.value,
                telephone_declarant: dom.telephoneDeclarant.value,
                id_vehicule: vehicules,
                id_contribuable: dom.contribuable.value,
                echeance: dom.echeance.value,
            };

            await newTaxation(body);

        }

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
            date_attestation: dom.dateAttestation.value,
        };

        await newAttestation(body);
        console.log(body);
    });
}
