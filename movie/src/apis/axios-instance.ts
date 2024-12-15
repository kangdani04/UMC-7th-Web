import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_MOVIE_API_URL as string, // baseURL을 string으로 타입 단언
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN as string}`, // Access Token도 string으로 타입 단언
  },
});

export { axiosInstance };
