import axios from 'axios';
import dom from './utils/dom';
import {alert, clearHtml} from './utils/alert';

export const newPerson = async (body) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/contribuables',
            data: body,

        });

        if (res.data.status === 'success') {
            alert('alert-success', 'Personne créée', dom.containerError);
            dom.formNewPerson.reset();
        }
    } catch (err) {
        clearHtml(dom.containerError);
        alert('alert-danger', err.response.data.message, dom.containerError);
    }


};