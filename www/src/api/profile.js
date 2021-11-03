import axios from '@/api/axios.js';

export const getProfile = (params) => {
    return axios.get({
        url: '/profile/list',
        params
    });
}

export const add = (data) => {
    return axios.post({
        url: '/profile/add',
        data
    });
}

export const update = (data) => {
    return axios.post({
        url: '/profile/update',
        data
    });
}