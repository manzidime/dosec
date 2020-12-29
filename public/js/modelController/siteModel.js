import axios from 'axios';
import dom from '../utils/dom';
import {clearHtml, alert} from '../utils/alert';

//Obtenir les données
export const allSites = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/sites',

        });

        if (res.data.status === 'success') {
            return res.data.data.rows
        }
    } catch (err) {
        console.log(err.response.data.message)
    }
};

//Création du site
export const createOne = async (body) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/sites',
            data:body
        });

        if (res.data.status === 'success') {
            alert('alert-success', '', dom.containerAlert)
            return res.data.data.newRow
        }
    } catch (err) {
        alert('alert-danger', err.response.data.message, dom.containerError)
    }
};

//Obtenir les données
export const getOneSite = async (id) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/sites/${id}`,
        });

        if (res.data.status === 'success') {
            return res.data.data.row
        }
    } catch (err) {
        console.log(err.response.data.message)
    }
};

//Mise à jour
export const updateSite = async (body,id,container) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/sites/${id}`,
            data:body
        });

        if (res.data.status === 'success') {
            console.log(res.data.data)
            alert('alert-success', '', dom.containerAlert)
            return res.data.data.row
        }
    } catch (err) {
        console.log(err.response.data.message)
        alert('alert-danger', err.response.data.message, container)
    }
};

//Delete site
export const deleteSite = async(body,id)=>{
    try{
      const res = await axios({
          method:'PATCH',
          url:`/api/v1/sites/disable-active/${id}`,
          data:body
      })

      if(res.data.status === 'success'){
          console.log(res.data)
          return res.data.data.row
      }
    }
    catch(err){
        console.log(err.response.data.message)
    }
}