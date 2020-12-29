import axios from 'axios';
import {alert, clearHtml} from './utils/alert';
import dom from './utils/dom';

//Login
export const login = async (login, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                login,
                password,
            },
        });

        if (res.data.status === 'success') {
            window.location = '/home';
        }
    } catch (err) {
        clearHtml(dom.containerError);
        alert('alert-danger', err.response.data.message, dom.containerError);
    }

};

//Logout
export const logout = async () => {
    const res = await axios({
        method: 'GET',
        url: '/api/v1/users/logout',
    });

    if (res.data.status === 'success') {
        window.location = '/';
    }
};