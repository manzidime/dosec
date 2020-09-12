import axios from 'axios';
import dom from './dom';
import {clearHtml} from './alert';

export const getTaxe2 = async (id) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/taxe/type/${id}`,
        });

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

export const getVehicules = async (id) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/vehicules/contribuable/${id}`,
        });

        if (res.data.status === 'success') {
            const vehicules = res.data.data.rows;

            const options = vehicules.map((el, index) => {
                return `<option value="${el.id_vehicule}">${el.numero_plaque} | ${el.numero_chassis} | ${el.marque} | ${el.couleur} | ${el.model} </option>`;
            })
            .join(' ');

            if (dom.contribuables.length !== 0) {
                dom.contribuables.forEach((el, index) => {
                    clearHtml(dom.vehicules[index]);
                    dom.vehicules[index].innerHTML = options;
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