import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card'; // Card 컴포넌트
import * as S from '../styles/movies.style.js';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`, 
            },
          }
        );
        setMovies(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
        }
      };
      getMovies();
    }, []);

  return (
    <S.CardList>
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </S.CardList>
  );
};

export default MoviesPage;
