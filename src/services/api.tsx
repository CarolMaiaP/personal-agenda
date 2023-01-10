import axios from 'axios';

export const api = axios.create({
  baseURL: "https://demometaway.vps-kinghost.net:8485",
})