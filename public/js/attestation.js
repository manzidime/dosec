import axios from 'axios';
import dom from './utils/dom';
import {alert, clearHtml} from './utils/alert';

export const newAttestation = async (body) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/attestation',
            data: body,

        });

        if (res.data.status === 'success') {
            alert('alert-success', 'Attestation créée', dom.containerError);
            dom.formNewAttestation.reset();
        }
    } catch (err) {
        clearHtml(dom.containerError);
        alert('alert-danger', err.response.data.message,dom.containerError);
    }


};