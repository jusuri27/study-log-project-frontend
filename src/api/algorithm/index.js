import axios from '../axios.js';
import * as api from '../path.js';

const ALGORITHM = api.path.ALGORITHM;

const getAlgorithmsAPI = (page, size) => {
    return axios({
            url: ALGORITHM.BASE,
            method: 'get'
        })
        .then(res => {
            if (!res.data) {
                throw new Error("응답 에러: 데이터가 없습니다.");
            }
            return { response: res, error: null };
        })
        .catch(err => {
            console.error(err);
            return { response: null, error: err };
        });
};

const createAlgorithmAPI = (params) => {
    return axios({
            url: ALGORITHM.BASE,
            method: 'post',
            data: params
        })
        .then(res => {
            if (!res.data) {
                throw new Error("응답 에러: 데이터가 없습니다.");
            }
            return { response: res, error: null };
        })
        .catch(err => {
            console.error(err);
            return { response: null, error: err };
        });
};


export { getAlgorithmsAPI, createAlgorithmAPI };