import axios from 'axios'
import dom from '../utils/dom';
import {alert,clearHtml} from '../utils/alert';

//1. Création
export const createTarif = async(body)=>{
    try{
        const res = await axios({
            method:'POST',
            url:'/api/v1/tarif',
            data:body
        })

        if(res.data.status === 'success'){
            alert('alert-success', '', dom.containerAlert)
            return res.data.data.newRow
        }
    }
    catch(err){
        alert('alert-danger', err.response.data.message, dom.containerAlert)
    }
}

//2. Get all
export const getAllTarif = async()=>{
    try{
        const res = await axios({
            method:'GET',
            url:'/api/v1/tarif',
        })

        if(res.data.status === 'success'){
            return res.data.data.rows
        }
    }
    catch(err){
        console.log(err.response.data.message)
    }
}

//3. Update
export const updateTarif = async(body,id,container)=>{
    try{
        const res = await axios({
            method:'PATCH',
            url:`/api/v1/tarif/${id}`,
            data:body
        })

        if(res.data.status === 'success'){
            alert('alert-success', '', dom.containerAlert)
            return res.data.data.row
        }
    }
    catch(err){
        console.log(err.response.data.message)
        alert('alert-danger',err.response.data.message,container)
    }
}

//Delete site
export const stateTarif = async(body,id)=>{
    try{
        const res = await axios({
            method:'PATCH',
            url:`/api/v1/tarif/disable-active/${id}`,
            data:body
        })

        if(res.data.status === 'success'){
            console.log(res.data)
        }
    }
    catch(err){
        console.log(err.response.data.message)
    }
}

//3. Les montants pour la tarification
export const montantTaxation = async(taxe,article,categorie,echeance)=>{
    try{
        const res = await axios({
            method:'GET',
            url:`/api/v1/tarif/tarif-taxation/${taxe}/${article}/${categorie}/${echeance}`,
        })
        if(res.data.status === 'success'){
            return res.data.data.tarif
        }
    }
    catch(err){
        console.log(err.response.data.message)
    }
}