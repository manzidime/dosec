import axios from 'axios';
import dom from "../utils/dom";
import {alert} from "../utils/alert";

//Create
export const createTaxe = async(body)=>{
    try{
        const res = await axios({
            method:'POST',
            url:`/api/v1/taxe`,
            data:body
        })

        if(res.data.status === 'success'){
            alert('alert-success', '', dom.containerAlert)
            console.log(res.data.data.newRow)
            return res.data.data.newRow
        }
    }
    catch(err){
        console.log(err.response.data.message)
        alert('alert-danger', err.response.data.message, dom.containerAlert)
    }
}

export const allTaxe = async()=>{
    try{
        const res = await axios({
            method:'GET',
            url:'/api/v1/taxe',
        })

        if(res.data.status === 'success'){
            return res.data.data.rows
        }
    }
    catch(err){
        console.log(err.response.data.message)
    }
}

export const getOneTaxe = async(id)=>{
    try{
        const res = await axios({
            method:'GET',
            url:`/api/v1/taxe/${id}`,
        })

        if(res.data.status === 'success'){
            return res.data.data.row
        }
    }
    catch(err){
        console.log(err.response.data.message)
    }
}

export const updateTaxe = async(body,id)=>{
    try{
        const res = await axios({
            method:'PATCH',
            url:`/api/v1/taxe/${id}`,
            data:body
        })

        if(res.data.status === 'success'){
            alert('alert-success', '', dom.containerAlert)
            return res.data.data.row
        }
    }
    catch(err){
        console.log(err.response.data.message)
        alert('alert-danger', err.response.data.message, document.querySelector(`.container-alert-${id}`))
    }
}

//State
export const stateTaxe = async(body,id)=>{
    try{
        const res = await axios({
            method:'PATCH',
            url:`/api/v1/taxe/state/${id}`,
            data:body
        })

        if(res.data.status === 'success'){
            //alert('alert-success', '', dom.containerAlert)
            console.log(res.data.data.row)
        }
    }
    catch(err){
        console.log(err.response.data.message)
        //alert('alert-danger', err.response.data.message, document.querySelector(`.container-alert-${id}`))
    }
}

export const taxeByService = async (id) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/taxe/type/${id}`,
        });
        if (res.data.status === 'success') {
            return res.data.data.rows;
        }
    } catch (err) {
        console.log(err.response.data.message);
    }

};