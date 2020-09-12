import axios from 'axios';
import dom from './utils/dom';
import {clearHtml} from './utils/alert';

export const getarticle = async (id) => {
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
                clearHtml(dom.taxe);
                dom.articles.innerHTML = options;
            }
        }
    } catch (err) {
        console.log(err.response.data.message);
    }

};

export const getTaxe = async (id) => {
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

            if (dom.types.length !== 0) {
                dom.types.forEach((el, index) => {
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