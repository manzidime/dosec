import axios from 'axios';
import dom from './utils/dom';
import {alert, clearHtml} from './utils/alert';

//Obtenir les données
export const allUser = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users',

        });

        if (res.data.status === 'success') {
            return res.data.data.rows
        }
    } catch (err) {
        console.log(err.response.data.message)
    }
};

//Nouvel utilisateur
export const newUser = async (body) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users',
            data: body,

        });

        if (res.data.status === 'success') {
            clearHtml(dom.containerError);
            alert('alert-success', 'Insertion: nouvel utilisateur', dom.containerError);
            dom.formNewUser.reset();
        }
    } catch (err) {
        clearHtml(dom.containerError);
        alert('alert-danger', err.response.data.message, dom.containerError);
    }
};

//Mise à jour de l'utilisateur
export const userUpdate = async (body,id,container) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/users/${id}`,
            data: body,
        });

        if (res.data.status === 'success') {
            console.log(res.data.status)
            alert('alert-success', 'Mises à jour effectuée', dom.containerAlert)
            return res.data.status
        }
    } catch (err) {
        console.log(err.response.data.message)
        alert('alert-danger',err.response.data.message,container )
    }
};

//Disable or active
export const stateUser = async (body, id) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/users/activeOrDisableUser/${id}`,
            data: body,
        });

        if (res.data.status === 'success') {
            console.log(res.data)
        }

    } catch (err) {
        console.log(err.response.data.message)
    }

};