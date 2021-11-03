import axios from '@/api/axios.js';

export const getList = (params) => {
    return axios.get({
        url: '/contact/list',
        params
    });
}

export const add = (data) => {
    return axios.post({
        url: '/contact/add',
        data
    });
}

export const update = (data) => {
    return axios.post({
        url: '/contact/update',
        data
    });
}

export const del = (_id) => {
    return axios.post({
        url: '/contact/delete',
        data: {
            _id
        }
    });
}

export const delMany = (_idArr) => {
    return axios.post({
        url: '/contact/deleteMany',
        data: _idArr
    });
}