import axios from 'axios'
import {alert, clearHtml} from '../utils/alert';
import dom from '../utils/dom';

export const taxationOrd = async()=>{
    try{
        const res = await axios({
            method:'GET',
            url:'/api/v1/attestation/taxation-valide'
        })
        if(res.data.status==='success'){
            return res.data.data.taxations
        }
    }catch(err){
        console.log(err.response.data.message)
    }
}

export const newAttestation = async (body,container) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/attestation',
            data: body,

        });

        if (res.data.status === 'success') {
            alert('alert-success', `Attestation créée`, dom.containerAlert);
            console.log(res.data.data)
            return res.data.data.newRow.insertId
        }
    } catch (err) {
        alert('alert-danger', err.response.data.message, container);
    }

};