import axios from 'axios';

//Obtenir les données
export const allFonctions = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/fonctions',

        });

        if (res.data.status === 'success') {
            return res.data.data.rows
        }
    } catch (err) {
        console.log(err.response.data.message)
    }
};