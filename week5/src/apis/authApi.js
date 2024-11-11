import axios from "axios";

const axiosInstanceBE=axios.create({
    baseURL: import.meta.env.VITE_BE_URL,
    headers:{
        "Content-Type": "application/json",
    },
})


// 토큰을 설정하는 함수
const setAuthToken = (token) => {
    if (token) {
        // 토큰이 있으면 헤더에 추가
        axiosInstanceBE.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
        // 토큰이 없으면 Authorization 헤더 제거
        delete axiosInstanceBE.defaults.headers['Authorization'];
    }
};

export { axiosInstanceBE, setAuthToken };