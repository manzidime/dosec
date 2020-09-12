import axios from 'axios';
import dom from './utils/dom';
import {clearHtml} from './utils/alert';

export const getCommune = async (id) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/communes/by-district/${id}`,
        });

        if (res.data.status === 'success') {
            const communes = res.data.data.rows;

            const defaultValue = `<option disabled selected>...</option>`;

            const options = communes.map((el, index) => {
                return `<option value="${el.id_commune}">${el.libelle_commune}</option>`;
            })
            .join(' ');

            if (dom.districtAr.length !== 0) {
                dom.districtAr.forEach((el, index) => {
                    clearHtml(dom.quartierAr[index]);
                    clearHtml(dom.communeAr[index]);
                    //dom.communeAr[index].insertAdjacentHTML('afterbegin', defaultValue)
                    dom.communeAr[index].insertAdjacentHTML('beforeend', options)
                });
            }

            if (dom.commune) {
                clearHtml(dom.quartier);
                clearHtml(dom.commune);
                //dom.commune.insertAdjacentHTML('afterbegin', defaultValue);
                dom.commune.insertAdjacentHTML('beforeend', options);
            }
        }
    } catch (err) {
        console.log(err.response.data.message);
    }

};