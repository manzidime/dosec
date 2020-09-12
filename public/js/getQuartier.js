import axios from 'axios';
import dom from './utils/dom';
import {clearHtml} from './utils/alert';

export const getQuartiers = async (id) => {
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