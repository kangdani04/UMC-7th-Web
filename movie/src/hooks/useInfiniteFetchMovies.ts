import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios-instance";

// 영화 데이터 타입 정의
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
};

type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const useInfiniteFetchMovies = (
  url: string
): UseInfiniteQueryResult<{ pages: MoviesResponse[]; pageParams: number[] }, Error> => {
  const fetchMovies = async ({
    pageParam = 1,
  }: {
    pageParam?: number;
  }): Promise<MoviesResponse> => {
    const response = await axiosInstance.get<MoviesResponse>(
      `${url}&page=${pageParam}`
    );
    return response.data;
  };

  return useInfiniteQuery<MoviesResponse, Error>({
    queryKey: ["movies", url], // 쿼리 키
    queryFn: fetchMovies, // 쿼리 함수
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
};

export default useInfiniteFetchMovies;
