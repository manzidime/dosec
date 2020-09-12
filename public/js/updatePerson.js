import axios from 'axios';
import dom from './utils/dom';
import {clearHtml, alert} from './utils/alert';

export const updatePerson = async (body, id) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/contribuables/${id}`,
            data: body,

        });

        if (res.data.status === 'success') {
            const container = document.querySelector(`.alert-update-person-${id}`);
            clearHtml(container);
            alert('alert-success', 'Personne mise à jour', container);
        }
    } catch (err) {
        const container = document.querySelector(`.alert-update-person-${id}`);
        clearHtml(container);
        alert('alert-danger', err.response.data.message, container);
    }

};