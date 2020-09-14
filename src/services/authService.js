import jwtDecode from 'jwt-decode';
import http from "./httpService";
import { apiUrl } from "../config.json";
import axios from 'axios';

// const apiEndpoint = apiUrl + "/api/rep/login";
axios.defaults.baseURL = 'http://api.zyaratmedical.com';

const tokenKey = 'token';


export async function login(jsnObj) {
    const { data: jwt } = await http.post('/api/rep/admin_login', jsnObj, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
    localStorage.setItem(tokenKey, JSON.stringify(jwt));

}
export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);

    } catch (error) {
        return null;
        //in case of we don't have a valid JWT in our localStorage we just ignore it.
    }
}

export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser
}
