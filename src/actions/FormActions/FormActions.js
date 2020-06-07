import {
    API_BASE
} from './../../configs/Configs';
import {
    handleCatch,
    handleResponse
} from '../../utilities/FormUtilities/FormUtilities'

import {
        getAuthToken
} from '../AuthAction/AuthAction'

export const postData = async (data) => {
    const token = getAuthToken();
    return fetch(`${API_BASE}site/info`, {
        headers:{
            "Content-Type": "application/json",
            "Accept":"application/json",
            "Authorization":`Bearer ${token}`,
        },
        method: 'POST',
        body:JSON.stringify(data),
    })
    .then((res) => { 
            return handleResponse(res) ;
         // return res ;
    })
    .catch((e) => {
        return handleCatch(e) ;
    })
}

export const postDataEthics = async (data) => {
    const token = getAuthToken();
    return fetch(`${API_BASE}ethics/info`, {
        headers:{
            "Content-Type": "application/json",
            "Accept":"application/json",
            "Authorization": `Bearer ${token}`,
        },
        method: 'POST',
        body:JSON.stringify(
            data
        ),
    })
    .then((res) => {
        return handleResponse(res) ;
    })
    .catch((e) => {
        return handleCatch(e) ;
    })
}

    export const getData = async() =>{
        const token = getAuthToken();
        return fetch(`${API_BASE}get-data`, {
            headers:{
                "Content-Type": "application/json",
                "Accept":"application/json",
                "Authorization": `Bearer ${token}`,
            },
            method: 'GET', 
        })
        .then((res) => {
            return handleResponse(res)
        })
        .catch((e) => {
            return handleCatch(e) ;
        })
    }

export const updateData = async(data) =>{
        const token = getAuthToken();
        return fetch(`${API_BASE}update-data`, {
            headers:{
                "Content-Type": "application/json",
                "Accept":"application/json",
                "Authorization": `Bearer ${token}`,
            },
            method: 'PUT', 
            body:JSON.stringify(data),
        })
        .then((res) => {
            return handleResponse(res)
        })
        .catch((e) => {
            return handleCatch(e) ;
        })
    }
