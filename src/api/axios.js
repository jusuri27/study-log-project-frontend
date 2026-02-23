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



export default instance;