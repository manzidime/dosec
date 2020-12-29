import axios from 'axios';
import dom from "../utils/dom";
import {alert} from "../utils/alert";

//Create
export const createTaux = async(body)=>{
    try{
        const res = await axios({
            method:'POST',
            url:`/api/v1/taux`,
            data:body
        })

        if(res.data.status === 'success'){
            alert('alert-success', '', dom.containerError)
            return res.data.data.newRow
        }
    }
    catch(err){
        alert('alert-danger', err.response.data.message, dom.containerError)
    }
}

export const allTaux = async()=>{
    try{
        const res = await axios({
            method:'GET',
            url:'/api/v1/taux',
        })

        if(res.data.status === 'success'){
            return res.data.data.rows
        }
    }
    catch(err){
        console.log(err.response.data.message)
    }
}