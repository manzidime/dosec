import axios from 'axios';
import {alert, clearHtml} from '../utils/alert';
import dom from '../utils/dom';

export const createApi = async (body) => {
    const container = document.getElementById('container-alert-api')

    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/api',
            data:body

        });

        if (res.data.status === 'success') {
            clearHtml(container)
            alert('alert-success', '', container)
        }
    } catch (err) {
        clearHtml(container)
        alert('alert-danger', err.response.data.message, container)
    }
};