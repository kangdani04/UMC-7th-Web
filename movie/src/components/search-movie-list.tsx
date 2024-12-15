import styled from "styled-components";
import Movie from "./Card/movie";
import useCustomFetch from "../hooks/useCustomFetch";
import { useSearchParams } from "react-router-dom";
import CardListSkeleton from "./Card/Skeleton/card-list-skeleton";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
};

type MoviesResponse = {
  results: Movie[];
};

const SearchMovieList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    mq: "",
  });

  const mq = searchParams.get("mq");
  const url = `${import.meta.env.VITE_TMDB_MOVIE_API_URL}/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`;

  const { data: movies, isLoading, isError } = useCustomFetch<MoviesResponse>({ url });

  console.log(movies);

  if (isError) {
    return <h1 style={{ color: "white" }}>에러 발생</h1>;
  }

  if (isLoading) {
    return (
      <CardList>
        <CardListSkeleton number={20} />
      </CardList>
    );
  }

  // 검색 결과가 없을 경우 예외 처리
  if (mq && movies?.results?.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h1 style={{ color: "white" }}>해당하는 검색어 &lt;{mq}&gt;에</h1>
        <h1 style={{ color: "white" }}>해당하는 데이터가 없습니다.</h1>
      </div>
    );
  }

  return (
    <CardList>
      {movies?.results?.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </CardList>
  );
};

export default SearchMovieList;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
`;
