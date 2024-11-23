import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../apis/axios-instance'; // TMDB API 인스턴스
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const GenrePage = () => {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 장르 목록을 불러오는 함수
  const fetchGenres = async () => {
    try {
      const response = await axiosInstance.get('/genre/movie/list', {
        params: { language: 'ko' },
      });
      setGenres(response.data.genres);
    } catch (error) {
      console.error('장르 목록 불러오기 실패:', error);
    }
  };

  // 특정 장르에 해당하는 영화들을 불러오는 함수
  const fetchMoviesByGenre = async (genreId) => {
    try {
      const response = await axiosInstance.get('/discover/movie', {
        params: {
          with_genres: genreId,
          language: 'ko',
        },
      });
      setMovies(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.error('장르별 영화 목록 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  // 장르 선택 시, 해당 장르의 영화 목록을 불러옵니다.
  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    fetchMoviesByGenre(genreId);
  };

  return (
    <GenreContainer>
      <h1>영화 장르</h1>
      <GenreList>
        {genres.map((genre) => (
          <GenreButton
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </GenreButton>
        ))}
      </GenreList>

      <MovieList>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          movies.map((movie) => (
            <MovieCard key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <p>{movie.title}</p>
            </MovieCard>
          ))
        )}
      </MovieList>
    </GenreContainer>
  );
};

export default GenrePage;

// 스타일링
const GenreContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
`;

const GenreButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #cd4275;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #9b365f;
  }
`;

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MovieCard = styled.div`
  width: 150px;
  margin: 10px;
  cursor: pointer;
  text-align: center;

  img {
    width: 100%;
    border-radius: 5px;
  }

  p {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
  }

  &:hover img {
    opacity: 0.8;
  }
`;
