import axios from 'axios';

export const allQuartier = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/quartiers`,
        });

        if (res.data.status === 'success') {
            return res.data.data.rows;
        }
    } catch (err) {
        console.log(err.response.data.message);
    }
};