import axios from 'axios';
import dom from './utils/dom';
import {alert, clearHtml} from './utils/alert';

export const newAttestation = async (body, container) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/attestation',
            data: body,

        });

        if (res.data.status === 'success') {
            alert('alert-success', ' Attestation créée', container);
        }
    } catch (err) {
        clearHtml(container);
        alert('alert-danger', err.response.data.message, container);
    }

};