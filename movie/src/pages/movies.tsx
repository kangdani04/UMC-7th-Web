import React, { useState } from "react";
import styled from "styled-components";
import usePaginationMovies from "../hooks/usePaginationMovies";
import MovieCard from "../components/Card/movie";
import LoadingSpinner from "../components/LoadingSpinner";

type MoviesPageProps = {
  url: string;
};

const MoviesPage: React.FC<MoviesPageProps> = ({ url }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data,
    isLoading,
    isError,
    isPreviousData,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
  } = usePaginationMovies({
    url,
    currentPage,
  });

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) {
    return (
      <Grid>
        <LoadingSpinner />
      </Grid>
    );
  }

  if (isError) {
    return <p>Error loading movies. Please try again later.</p>;
  }

  const totalPages = data?.pages?.[0]?.total_pages || 1; // 전체 페이지 수

  return (
    <div>
      <Grid>
        {data.pages.map((page) =>
          page.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </Grid>
      <Pagination>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1 || isPreviousData}
        >
          이전
        </button>
        <PageNumber>{currentPage}페이지</PageNumber>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || isPreviousData}
        >
          다음
        </button>
      </Pagination>
    </div>
  );
};

export default MoviesPage;

// Styled Components
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 20px;

  button {
    color: white;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    background-color: #cd4275;

    &:disabled {
      cursor: not-allowed;
      background-color: #808080;
    }
  }
`;

const PageNumber = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  text-align: center;
`;
