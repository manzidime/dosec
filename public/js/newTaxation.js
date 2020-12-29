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
            alert('alert-success', ' Taxation créée', dom.containerAlert);
            dom.formNewTaxation.reset();
        }
    } catch (err) {
        alert('alert-danger', err.response.data.message, dom.containerAlert);
    }

};

export const updateTaxation = async (body, id) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/taxation/${id}`,
            data: body,
        });

        if (res.data.status === 'success') {
            const container = document.querySelector(`.container-alert-${id}`);
            clearHtml(container);
            alert('alert-success', '', container);
        }
    } catch (err) {
        const container = document.querySelector(`.container-alert-${id}`);
        clearHtml(container);
        alert('alert-danger', err.response.data.message, container);
    }

};

export const brokeTaxation = async (body, id) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/taxation/${id}`,
            data: body,
        });

        if (res.data.status === 'success') {
            alert('alert-warning', ' La taxation est annulée', dom.containerError);
        }
    } catch (err) {
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
            console.log(res.data)
        }
    } catch (err) {
        console.log(err.response.data.message)
    }

};

export const validateTaxation = async (body, id) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/taxation/activateTaxation/${id}`,
            data: body,
        });

        if (res.data.status === 'success') {
            alert('alert-success', ' Votre taxation est validée', dom.containerError);
            return res.data.status
        }
    } catch (err) {
        const container = document.querySelector(`.container-alert-${id}`);
        alert('alert-danger', err.response.data.message, container);
    }
};

export const allTaxation = async()=>{
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/taxation',
        });

        if (res.data.status === 'success') {
            return res.data.data.rows
        }
    } catch (err) {
        clearHtml(dom.containerError);
    }
}