import axios from 'axios';

 export const API_BASE_URL = 'http://localhost:8080';

// Axios 기본 설정 
const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000, // 요청 제한 시간
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// 공통 request 함수
export const request = async (config) => {
    try {
        const res = await instance(config);

        return { response: res, error: null };
    } catch (err) {
        console.error(err);
        return { response: null, error: err };
    }
};



export default instance;