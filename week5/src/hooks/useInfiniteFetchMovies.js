import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios-instance";

const useInfiniteFetchMovies = (url) => {
  const fetchMovies = async ({ pageParam = 1 }) => {
    const response = await axiosInstance.get(`${url}&page=${pageParam}`);
    return response.data;
  };

  return useInfiniteQuery({
    queryKey: ["movies", url], // 쿼리 키를 객체 형식으로 지정
    queryFn: fetchMovies, // 쿼리 함수는 queryFn 키를 통해 지정
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });
};

export default useInfiniteFetchMovies;
