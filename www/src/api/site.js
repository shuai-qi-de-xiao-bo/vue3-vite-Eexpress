import axios from '@/api/axios.js';

export const getSite = (params) => {
    return axios.get({
        url: '/site/list',
        params
    });
}

export const add = (data) => {
    return axios.post({
        url: '/site/add',
        data
    });
}

export const update = (data) => {
    return axios.post({
        url: '/site/update',
        data
    });
}

export const upload = (data) => {
    return axios.post({
        url: '/upload',
        data
    });
}