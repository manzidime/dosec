import axios from 'axios';
import dom from './utils/dom';
import {alert, clearHtml} from './utils/alert';

export const changePassword = async (oldPassword, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: '/api/v1/users/changeMePassword',
            data: {
                oldPassword,
                password,
                passwordConfirm,
            },
        });

        if (res.data.status === 'success') {
            clearHtml(dom.containerError);
            alert('alert-success', 'Votre mot de passe a été changé');
            dom.formChangePassword.reset()
        }
    } catch (err) {
        clearHtml(dom.containerError);
        alert('alert-danger', err.response.data.message);
    }

};