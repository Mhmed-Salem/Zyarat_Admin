import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + '/api/Competition/getNext';




let config = {
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
  }
}





export function getNextDailyCompetition() {
    return http.get('/api/Competition/getNext/daily');
  }

export function getNextMonthlyCompetition() {
    return http.get('/api/Competition/getNext/monthly');
  }