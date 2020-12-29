import axios from 'axios'
import {alert} from "../utils/alert";
import dom from "../utils/dom";

//Create
export const createArticle = async(body)=>{
    try{
        const res = await axios({
            method:'POST',
            url:`/api/v1/articles`,
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

//1. la liste de tous les articles
export const allArticle = async()=>{
    try{
        const res = await axios({
            method:'GET',
            url:'/api/v1/articles'
        })

        if(res.data.status === 'success'){
            return res.data.data.rows
        }
    }
    catch(err){
        console.log(err.response.data.message)
    }
}

//2. Liste des aarticles obtenus par leur type
export const articleBytype = async (id) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/articles/type/${id}`,
        });

        if (res.data.status === 'success') {
            return res.data.data.rows;
        }
    } catch (err) {
        console.log(err.response.data.message);
    }

};

export const updateArticle = async(body,id)=>{
    try{
        const res = await axios({
            method:'PATCH',
            url:`/api/v1/articles/${id}`,
            data:body
        })

        if(res.data.status === 'success'){
            alert('alert-success', '', dom.containerAlert)
            return res.data.data.row
        }
    }
    catch(err){
        alert('alert-danger', err.response.data.message, document.querySelector(`.container-alert-${id}`))
    }
}

//State
export const stateArticle = async(body,id)=>{
    try{
        const res = await axios({
            method:'PATCH',
            url:`/api/v1/articles/state/${id}`,
            data:body
        })

        if(res.data.status === 'success'){
            console.log(res.data.data.row)
        }
    }
    catch(err){
        console.log(err.response.data.message)
    }
}