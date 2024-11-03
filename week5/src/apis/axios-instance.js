import axios from "axios";

const axiosInstance=axios.create({
    baseURL: import.meta.env.VITE_TMDB_MOVIE_API_URL, // baseURL 확인
    headers:{
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
    },
})

export {axiosInstance}