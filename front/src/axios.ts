import axios from 'axios';

const baseURL = import.meta.env.VITE_AXIOS_BASE_URL;

const instance = axios.create({
    baseURL: baseURL || "http://localhost:3000",
    timeout: 7000
});

export default instance;