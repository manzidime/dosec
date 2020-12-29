import axios from 'axios';
import {clearHtml} from '../utils/alert';

export const proprietesTaxation = async (id) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/taxation/vehicules-taxations/${id}`,
        });
        if (res.data.status === 'success') {
            return res.data.data.all;
        }
    } catch (err) {
        console.log(err.response.data.message);
    }
};

export const listNotesCalcul = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/taxation/notes`,
        });
        if (res.data.status === 'success') {
            return res.data.data.notes;
        }
    } catch (err) {
        console.log(err.response.data.message);
    }
};