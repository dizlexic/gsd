import axios from 'axios';
import { config } from '../config.js';

/**
 * xhttp - A axios instance for making requests to the API
 * @type {AxiosInstance}
 *
 * @param token
 * @returns {AxiosInstance}
 */
export const xhttp = (token = null)=>{

    const headers = {
        'Content-Type': 'application/json',
    }

    if(token)
        headers['Authorization'] = `Bearer ${token}`

    return axios.create({
        baseURL: config.url,
        headers,
    })
}

export default xhttp

