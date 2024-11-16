import React from "react";
import styled from "styled-components";
import useInfiniteFetchMovies from "../hooks/useInfiniteFetchMovies";
import CardListSkeleton from "../components/Card/Skeleton/card-list-skeleton";
import CardSkeleton from "../components/Card/Skeleton/card-skeleton";  // CardSkeleton 임포트 추가
import MovieCard from "../components/Card/movie";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../components/LoadingSpinner"; // 로딩 스피너

const MoviesPage = ({ url }) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteFetchMovies(url);

  const { ref, inView } = useInView({
    triggerOnce: false, // 여러 번 감지되도록 설정
    threshold: 1.0, // 하단에 도달 시 트리거
  });

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 로딩 상태가 너무 짧을 때를 대비해, 강제로 1초 딜레이를 추가
  const [loadingDelay, setLoadingDelay] = React.useState(true);

  React.useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setLoadingDelay(false), 1000); // 1초 후 로딩 상태 종료
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading && loadingDelay) {
    return (
      <Grid>
        <CardListSkeleton number={10} /> {/* 10개의 스켈레톤 UI 표시 */}
        <LoadingSpinner />
      </Grid>
    );
  }

  if (isError) {
    return <p>Error loading movies. Please try again later.</p>;
  }

  return (
    <Grid>
      {data.pages.map((page) =>
        page.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      )}
      {/* 기존 스켈레톤 UI 추가 */}
      {isFetchingNextPage && (
        <CardSkeletonWrapper>
          <CardSkeleton number={10} />
          <LoadingSpinner>Loading more movies...</LoadingSpinner>
        </CardSkeletonWrapper>
      )}
      <div ref={ref} />
    </Grid>
  );
};

export default MoviesPage;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const CardSkeletonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
`;