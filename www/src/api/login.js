import axios from '@/api/axios.js';

export const login = (data) => {
    return axios.post({
        url: '/login',
        data
    });
}

export const captcha = () => {
    return axios.get({
        url: '/captcha'
    });
}