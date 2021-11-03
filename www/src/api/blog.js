import axios from '@/api/axios.js';

export const getList = (params) => {
    return axios.get({
        url: '/blog/list',
        params
    });
}

export const add = (data) => {
    return axios.post({
        url: '/blog/add',
        data
    });
}

export const update = (data) => {
    return axios.post({
        url: '/blog/update',
        data
    });
}

export const del = (_id) => {
    return axios.post({
        url: '/blog/delete',
        data: {
            _id
        }
    });
}

export const delMany = (_idArr) => {
    return axios.post({
        url: '/blog/deleteMany',
        data: _idArr
    });
}