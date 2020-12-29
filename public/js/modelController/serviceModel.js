import dom from '../utils/dom';
import axios from 'axios'
import {alert,clearHtml} from '../utils/alert';

//1. Creation
export const createService = async (body)=>{
    try{
        const res = await axios({
            method:'POST',
            url:'/api/v1/services',
            data:body
        })

        if(res.data.status === 'success'){
            clearHtml(dom.containerError)
            alert('alert-success', '', dom.containerError)
        }

    }
    catch (err){
        clearHtml(dom.containerError)
        alert('alert-danger', err.response.data.message, dom.containerError)
    }
}

//2. All
export const allServices = async ()=>{
    try{
        const res = await axios({
            method:'GET',
            url:'/api/v1/services',
        })

        if(res.data.status === 'success'){
            console.log(res.data)
            return res.data.data.rows
        }
    }
    catch (err){
        console.log(err.response.data.message)
    }
}

//3. Update
export const updateService = async (body,id)=>{
    try{
        console.log(body,id)
        const res = await axios({
            method:'PATCH',
            url:`/api/v1/services/${id}`,
            data: body
        })

        if(res.data.status === 'success'){
            //console.log(res.data)
        }
    }
    catch (err){
        console.log(err.response.data.message)
    }
}

//Disable or active
export const stateService = async (body,id)=>{
    try{
        console.log(body,id)
        const res = await axios({
            method:'PATCH',
            url:`/api/v1/services/disable-active/${id}`,
            data: body
        })

        if(res.data.status === 'success'){
            console.log(res.data)
        }
    }
    catch (err){
        console.log(err.response.data.message)
    }
}