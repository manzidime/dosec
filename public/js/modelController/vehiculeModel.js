import axios from 'axios';
import {alert} from '../utils/alert';
import dom from "../utils/dom";

//1. Créaation
export const newVehicule = async (body) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/vehicules',
            data: body,
        });

        if (res.data.status === 'success') {
            console.log(res.data)
            alert('alert-success', '', dom.containerAlert);
            form.reset()
        }
    } catch (err) {
        console.log(err.response.data.message)
        alert('alert-danger', err.response.data.message, dom.containerAlert);
    }

};

//2. Mise à jour
export const updateVehicule = async (body, id) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/vehicules/${id}`,
            data: body,
        });

        if (res.data.status === 'success') {
            alert('alert-success', 'Proprieté mises à jour', dom.containerAlert)
            return res.data.data.row
        }
    } catch (err) {
        const container = document.querySelector(`.container-alert-${id}`)
        alert('alert-danger', err.response.data.message, container)
    }
};

//3. Obtenir les vehicules de la taxation
export const allVehicules = async (contribuableId,serviceId) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/vehicules/cars/${contribuableId}/${serviceId}`,
        });

        if (res.data.status === 'success') {
            return res.data.data.vehicules
        }
    } catch (err) {
        console.log(err.response.data.message)
    }
};

//4. liste des vehicules
export const listOfVehicules = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/vehicules/list-vehicule`,
        });

        if (res.data.status === 'success') {
            return res.data.data.vehicules
        }
    } catch (err) {
        console.log(err.response.data.message)
    }
};

//5. Obtenir toutes les proprietés non vehicules
export const allProprieteNoVehicules = async (contribuableId,serviceId) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/vehicules/other/${contribuableId}/${serviceId}`,
        });

        if (res.data.status === 'success') {
            return res.data.data.vehicules
        }
    } catch (err) {
        console.log(err.response.data.message)
    }
};

//6. Disable or Restore
export const stateVehicule = async (body, id) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/vehicules/disableOrActive/${id}`,
            data: body,
        });

        if (res.data.status === 'success') {
            console.log(res.data)
        }
    } catch (err) {
        console.log(err.response.data.message)
    }

};