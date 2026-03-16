import {request} from '../axios.js';
import * as api from '../path.js';

const SOLVE = api.path.SOLVE;

const createSolveAPI = (params) => {
    return request({
        url: SOLVE.BASE,
        method: 'post',
        data: params
    })
};

const getSolvesAPI = (page, size) => {
    return request({
        url: SOLVE.BASE,
        method: 'get'
    })
};

const updateSolveAPI = (params, id) => {
    return request({
        url: `${SOLVE.BASE}/${id}`,
        method: 'patch',
        data: params
    })
};


export { getSolvesAPI, createSolveAPI, updateSolveAPI };