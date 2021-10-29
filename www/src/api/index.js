import axios from '@/api/axios.js';

export const getWeather = (params) => {
    return axios.get({
        url: '/weather',
        params
    });
}