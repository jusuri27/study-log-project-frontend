import {request} from '../axios.js';
import * as api from '../path.js';

const ALGORITHM = api.path.ALGORITHM;

const getAlgorithmsAPI = (page, size) => {
    return request({
        url: ALGORITHM.BASE,
        method: 'get'
    })
};

const createAlgorithmAPI = (params) => {
    return request({
        url: ALGORITHM.BASE,
        method: 'post',
        data: params
    })
};

const updateAlgorithmAPI = (params, id) => {
    return request({
        url: `${ALGORITHM.BASE}/${id}`,
        method: 'patch',
        data: params
    })
};


export { getAlgorithmsAPI, createAlgorithmAPI, updateAlgorithmAPI };