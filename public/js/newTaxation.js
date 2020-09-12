import axios from 'axios';
import dom from './utils/dom';
import {alert, clearHtml} from './utils/alert';

export const newTaxation = async (body) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/taxation',
            data: body,

        });

        if (res.data.status === 'success') {
            alert('alert-success', 'Taxation créée', dom.containerError);
            dom.formNewTaxation.reset();
        }
    } catch (err) {
        clearHtml(dom.containerError);
        alert('alert-danger', err.response.data.message, dom.containerError);
    }

};

export const updateTaxation = async (body, id, index) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/taxation/${id}`,
            data: body,
        });

        if (res.data.status === 'success') {
            const container = document.querySelectorAll('.container-error')[index];
            clearHtml(container);
            alert('alert-success', ' Taxation mise à jour!', container);

        }
    } catch (err) {
        const container = document.querySelectorAll('.container-error')[index];
        clearHtml(container);
        alert('alert-danger', err.response.data.message, container);
    }

};

export const desableTaxation = async (body, id) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/taxation/disableOrActive/${id}`,
            data: body,
        });

        if (res.data.status === 'success') {
            clearHtml(dom.containerError);
            alert('alert-success', ' Personne desactivée!', dom.containerError);
            dom.rowData.forEach((el, index) => {
                if (el.dataset.row == id) {
                    el.parentNode.removeChild(el);
                }
            });
        }
    } catch (err) {
        clearHtml(dom.containerError);
        alert('alert-danger', err.response.data.message);
    }

};

export const validateTaxation = async (body, id, index) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/taxation/activateTaxation/${id}`,
            data: body,
        });

        if (res.data.status === 'success') {
            const container = document.querySelectorAll('.container-alert')[index];
            clearHtml(container);
            alert('alert-success', 'Taxation validée', container);
        }
    } catch (err) {
        const container = document.querySelectorAll('.container-alert')[index];
        clearHtml(container);
        alert('alert-danger', err.response.data.message, container);
    }
};