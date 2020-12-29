import axios from 'axios';
import {alert, clearHtml} from '../utils/alert';
import dom from '../utils/dom';

//1. Création nouveau contribuable
export const newPerson = async (body) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/contribuables',
            data: body,

        });

        if (res.data.status === 'success') {
            alert('alert-success', 'Nouveau contribuable inséré', dom.containerError);
            dom.formNewPerson.reset()
            console.log(res.data.data.newRow)
            return res.data.data.newRow
        }
    } catch (err) {
        clearHtml(dom.containerError);
        alert('alert-danger', err.response.data.message, dom.containerError);
    }

};

//2. Mise à jour d'un contribuable
export const updatePerson = async (body, id) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/contribuables/${id}`,
            data: body,

        });

        if (res.data.status === 'success') {
            console.log(res.data)
            alert('alert-success', 'Contribuable mises à jour', dom.containerAlert)
            return res.data.data.row
        }
    } catch (err) {
        console.log(err.response.data.message)
        const container = document.querySelector(`.container-alert-${id}`)
        alert('alert-danger', err.response.data.message, container)
    }


};

//3. Obtenir tous les contribuables
export const allContribuables = async()=>{
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/contribuables',
        });

        if (res.data.status === 'success') {
            return res.data.data.rows
        }
    } catch (err) {
        console.log(err.response.data.message)
    }
}

export const stateContribuable = async (body, id) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/contribuables/disableOrActive/${id}`,
            data: body,
        });

        if (res.data.status === 'success') {
            console.log(res.data)
        }
    } catch (err) {
        console.log(err.response.data.message)
    }

};

export const oneContibuable = async(id)=>{
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/contribuables/${id}`,
        });

        if (res.data.status === 'success') {
            return res.data.data.row
        }
    } catch (err) {
        console.log(err.response.data.message)
    }
}