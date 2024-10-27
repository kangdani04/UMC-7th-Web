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
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGM5MTA3NWRjNmM5MTFkNWE4NjI0ZTBhNGQ1NjQ3MCIsIm5iZiI6MTcyOTc4Mzg4Ni4wNTI4NzMsInN1YiI6IjY3MThiNTFhNGJlMTU0NjllNzBkNTBkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P0Q-RziU0qYQByC7gnOlZxlQpIGUcUimUvfsUcIroAs`, // 실제 API key로 변경
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
