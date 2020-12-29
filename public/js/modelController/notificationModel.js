import axios from 'axios'

export const allNotification = async()=>{
    try{
        const res = await axios({
            method:'GET',
            url:'/api/v1/notification',
        })

        if(res.data.status === 'success'){
            return res.data.data.rows
        }
    }
    catch(err){
        console.log(err.response.data.message)
    }
}

//State
export const stateNotification = async(body,id)=>{
    try{
        const res = await axios({
            method:'PATCH',
            url:`/api/v1/notification/state/${id}`,
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

//State
export const readNotification = async(body,id)=>{
    try{
        const res = await axios({
            method:'PATCH',
            url:`/api/v1/notification/read/${id}`,
            data:body
        })

        if(res.data.status === 'success'){
            console.log(res.data.data.notification)
        }
    }
    catch(err){
        console.log(err.response.data.message)
    }
}