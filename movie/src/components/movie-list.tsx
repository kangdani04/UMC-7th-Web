import Movie from "./Card/movie";
import styled from "styled-components";
import useCustomFetch from "../hooks/useCustomFetch";
import CardListSkeleton from "./Card/Skeleton/card-list-skeleton";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
};

type MovieListProps = {
  url: string;
};

const MovieList: React.FC<MovieListProps> = ({ url }) => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch<{ results: Movie[] }>({ url });

  if (isLoading) {
    return (
      <CardList>
        <CardListSkeleton number={20} />
      </CardList>
    );
  }

  if (isError) {
    return (
      <>
        <h1>오류 발생</h1>
      </>
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

export default MovieList;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap; /* 요소들이 줄바꿈되도록 설정 */
  justify-content: left; /* 자식 요소 간의 간격을 균등하게 조절 */
  align-items: center;
`;
