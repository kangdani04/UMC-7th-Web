// src/pages/NowPlaying.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import * as S from '../styles/movies.style.js'; // 스타일 파일 경로에 맞게 수정

const NowPlaying = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/now_playing', {
            params: {
              api_key: '08c91075dc6c911d5a8624e0a4d56470',
              language: 'ko-KR',
              page: 1
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) return <p>영화를 불러오는 중입니다...</p>;

  return (
    <S.CardList>
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </S.CardList>
  );
};

export default NowPlaying;
