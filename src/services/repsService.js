import http from "./httpService";
import { apiUrl } from "../config.json";
import axios from 'axios';
import { logout } from './authService';
const apiEndpoint = apiUrl + 'api/rep/CountOnlineUsers';


// export function getOnlineUsers() {
//     return http.get('/api/gov');
//     //return http.post('http://zyaratmedical.com/api/message/AddGlobalMessage/Hello, World!')
//   }

