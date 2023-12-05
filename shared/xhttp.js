import axios from 'axios'
import { config } from '../config.js'

const xhttp = (token)=>{

    const headers = {
        'Content-Type': 'application/json',
    }

    if(token){
        headers['Authorization'] = `Bearer ${token}`
    }

    return axios.create({
        baseURL: config.url,
        headers,
    })
}

export default xhttp

