import axios from '@/api/axios.js';

export const getWeather = (params) => {
    return axios.get({
        url: '/weather',
        params
    });
}

export const upload = (data) => {
    return axios.post({
        url: '/upload',
        data
    });
}