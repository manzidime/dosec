import axios from 'axios';
import dom from '../utils/dom';
import {clearHtml, alert} from '../utils/alert';

//Obtenir les données
export const allCommune = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/communes',

        });

        if (res.data.status === 'success') {
            return res.data.data.rows
        }
    } catch (err) {
        console.log(err.response.data.message)
    }
};
