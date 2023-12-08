import axios from 'axios';

// const apiPort = "7118";
// const localApi = `https://localhost:${apiPort}/api`;
const externalApi = "https://eventplusapiwebgustavo.azurewebsites.net/api";
// const externalApi = null;

const api = axios.create({
    baseURL : externalApi
});

export default api;