import axios from 'axios';
import dom from './utils/dom';
import {clearHtml, alert} from './utils/alert';

export const desableCar = async (body, id) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/vehicules/disableOrActive/${id}`,
            data: body,
        });

        if (res.data.status === 'success') {
            clearHtml(dom.containerError);
            alert('alert-success', ' Personne desactivée!',dom.containerError);
            dom.rowData.forEach((el, index) => {
                if (el.dataset.row == id) {
                    el.parentNode.removeChild(el);
                }
            });
        }
    } catch (err) {
        clearHtml(dom.containerError);
        alert('alert-danger', err.response.data.message);
    }

};