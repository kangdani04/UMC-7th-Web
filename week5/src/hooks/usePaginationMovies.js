import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios-instance"; // axios 사용

const usePaginationMovies = ({ url, currentPage }) => {
  return useInfiniteQuery({
    queryKey: ["movies", url, currentPage], // queryKey 수정
    queryFn: async ({ pageParam = currentPage }) => {
      try {
        const response = await axiosInstance.get(`${url}&page=${pageParam}`);
        return response.data;
      } catch (error) {
        throw new Error("Error fetching movies: " + error.message);
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.page > 1 ? firstPage.page - 1 : undefined;
    },
    keepPreviousData: true,
  });
};

export default usePaginationMovies;
