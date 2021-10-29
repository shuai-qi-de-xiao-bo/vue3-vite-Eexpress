import axios from '@/api/axios.js';

export const getList = (params) => {
    return axios.get({
        url: '/user/list',
        params
    });
}

export const add = (data) => {
    return axios.post({
        url: '/user/add',
        data
    });
}

export const update = (data) => {
    return axios.post({
        url: '/user/update',
        data
    });
}

export const del = (_id) => {
    return axios.post({
        url: '/user/delete',
        data: {
            _id
        }
    });
}

export const delMany = (_idArr) => {
    return axios.post({
        url: '/user/deleteMany',
        data: _idArr
    });
}