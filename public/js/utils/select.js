import axios from 'axios';
import dom from './dom';
import {clearHtml} from './alert';

export const getTaxe2 = async (id) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/taxe/type/${id}`,
        });

        //Desactivation de l'écheance si la taxe controle technique n'est pas selctionné

        if (res.data.status === 'success') {
            const taxes = res.data.data.rows;

            const options = taxes.map((el, index) => {
                return `<option value="${el.id_taxe}">${el.designation}</option>`;
            })
            .join(' ');

            if (dom.services.length !== 0) {
                dom.services.forEach((el, index) => {
                    clearHtml(dom.taxes[index]);
                    dom.taxes[index].innerHTML = options;
                });
            }

            if (dom.taxe) {
                dom.taxe.innerHTML = options;
            }
        }
    } catch (err) {
        console.log(err.response.data.message);
    }

};

//Obtenir tous les vehicules d'un contribuable
export const getVehicules = async (id) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/vehicules/contribuable/${id}`,
        });

        if (res.data.status === 'success') {
            const vehicules = res.data.data.rows;

            console.log(vehicules);

            //Les vehicules proviennent de la table vehicules
            const options = vehicules.map((el, index) => {
                return `<option class="f-16" value="${el.id_vehicule}">${el.numero_plaque} | ${el.numero_chassis} | ${el.marque} | ${el.couleur} | ${el.model} </option><hr>`;
            })
            .join(' ');

            const rows = vehicules.map((el, index) => {
                return `<tr><td>${index +
                1}</td><td>${el.numero_chassis}</td><td>${el.numero_plaque}</td><td>${el.model}</td><td>${el.couleur}</td></tr>`;
            })
            .join(' ');


            if (dom.contribuables.length !== 0) {
                dom.contribuables.forEach((el, index) => {
                    clearHtml(dom.vehicules[index]);
                    dom.vehicules[index].innerHTML = rows;
                });
            }

            if (dom.vehicule) {
                dom.vehicule.innerHTML = options;
            }
        }
    } catch (err) {
        console.log(err.response.data.message);
    }

};

//Selectionner toutes les communes d'un district
export const communeByDistrict = async (id) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/communes/by-district/${id}`,
        });

        if (res.data.status === 'success') {
            const communes = res.data.data.rows;

            const options = communes.map((el, index) => {
                return `<option value="${el.id_commune}">${el.libelle_commune}</option>`;
            })
            .join(' ');

            if (dom.districtAr.length !== 0) {
                dom.districtAr.forEach((el, index) => {
                    clearHtml(dom.quartierAr[index]);
                    clearHtml(dom.communeAr[index]);
                    dom.communeAr[index].insertAdjacentHTML('beforeend', options);
                });
            }

            if (dom.commune) {
                clearHtml(dom.quartier);
                clearHtml(dom.commune);
                dom.commune.insertAdjacentHTML('beforeend', options);
            }
        }
    } catch (err) {
        console.log(err.response.data.message);
    }

};

//Selectionner tous les quartiers d'une commune
export const quartiersByCommune = async (id) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/quartiers/commune/${id}`,
        });

        if (res.data.status === 'success') {
            const quartier = res.data.data.rows;

            const options = quartier.map(el => {
                return `<option value="${el.id_quartier}">${el.libelle_quartier}</option>`;
            })
            .join(' ');

            if (dom.districtAr.length !== 0) {
                dom.districtAr.forEach((el, index) => {
                    clearHtml(dom.quartierAr[index]);
                    dom.quartierAr[index].innerHTML = options;
                });
            }

            if (dom.quartier) {
                clearHtml(dom.quartier);
                dom.quartier.innerHTML = options;
            }
        }
    } catch (err) {
        console.log(err.response.data.message);
    }
};

export const articleBytype = async (id) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/articles/type/${id}`,
        });

        if (res.data.status === 'success') {
            const articles = res.data.data.rows;

            const options = articles.map((el, index) => {
                return `<option value="${el.id_article_budgetaire}">${el.designation}</option>`;
            })
            .join(' ');

            if (dom.types.length !== 0) {
                dom.types.forEach((el, index) => {
                    clearHtml(dom.budge[index]);
                    dom.budge[index].innerHTML = options;
                });
            }

            if (dom.articles) {
                clearHtml(dom.articles);
                dom.articles.innerHTML = options;
            }
        }
    } catch (err) {
        console.log(err.response.data.message);
    }

};

export const vehiculesFromTaxation = async (id) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/taxation/vehicules-taxations/${id}`,
        });
        if (res.data.status === 'success') {
            const vehicules = res.data.data.all;

            const rows = vehicules.map((el, index) => {
                return `<tr><td>${index +
                1}</td><td>${el.montant}</td><td>${el.devise}</td><td>${el.numero_chassis}</td><td>${el.numero_plaque}</td><td>${el.model}</td><td>${el.marque}</td><td>${el.couleur}</td></tr>`;
            })
            .join(' ');

            const containerVehicules = document.querySelector(`.body-vehicules-${id}`);
            console.log(containerVehicules);
            clearHtml(containerVehicules);
            containerVehicules.innerHTML = rows;

        }
    } catch (err) {
        console.log(err.response.data.message);
    }
};