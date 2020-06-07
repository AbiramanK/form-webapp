import {
    API_BASE
} from './../../configs/Configs';

import {
    handleResponse,
    handleCatch,
} from '../../utilities/AuthUtilities/AuthUtilities';
  
const ACCESS_TOKEN = 'ACCESS_TOKEN'; 

export const register = async (name, email, password) => {
    return fetch(`${API_BASE}auth/signup`, {
        headers:{
            "Accept":"application/json",
            "Content-Type": "application/json",
        },
        method: 'POST',
        body:JSON.stringify({
            name,
            email,
            password,
            password_confirmation:password
        }),
    })
    .then((res) => {
        return handleResponse(res) ;
    })
    .catch((e) => {
        return handleCatch(e) ;
    })
}

export const login = async (email, password) => {
    return fetch(`${API_BASE}auth/signin`, {
        headers:{
            "Accept":"application/json", 
            "Content-Type": "application/json",
        },
        method: 'POST',
        body:JSON.stringify({
            email,
            password
        })
    })
    .then((res) => { 
        return handleResponse(res) ;
        // return res ;

    })
    .catch((e) => {
        return handleCatch(e) ;
    })
}

export const logout = async () => {
    let token = getAuthToken()
    return fetch(`${API_BASE}logout`, {
        headers:{
            'Authorization': `Bearer ${token}`,
        },
        method: 'POST',
    })
    .then((res) => { 
        return handleResponse(res) ;
    })
    .catch((e) => {
        return handleCatch(e) ;
    })
}

export const setAuthToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token)
}

export const getAuthToken = () => {
    return localStorage.getItem(ACCESS_TOKEN)
}
 
export const removeAuthToken = () => {
    localStorage.clear()
}