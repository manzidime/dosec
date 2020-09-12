import axios from 'axios';
import dom from './utils/dom';
import {alert, clearHtml} from './utils/alert';

export const newVehicule = async (body) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/vehicules',
            data: body,
        });

        if (res.data.status === 'success') {
            clearHtml(dom.containerError);
            alert('alert-success', ' Vehicule crée!',dom.containerError);
        }
    } catch (err) {
        clearHtml(dom.containerError);
        alert('alert-danger', err.response.data.message, dom.containerError);
    }

};

export const updateVehicule = async (body, id, index) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/vehicules/${id}`,
            data: body,
        });

        if (res.data.status === 'success') {
            const container = document.querySelectorAll('.container-error')[index];
            clearHtml(container);
            alert('alert-success', ' Vehicule mise à jour!', container);

        }
    } catch (err) {
        const container = document.querySelectorAll('.container-error')[index];
        clearHtml(container);
        alert('alert-danger', err.response.data.message, container);
    }

};