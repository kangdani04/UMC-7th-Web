// src/pages/TopRated.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top-rated`, {
            params: {
              api_key: process.env.REACT_APP_TMDB_API_KEY,
              language: 'ko-KR',
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <div>
      <h1 style={{ color: 'white' }}>높은 평가를 받은 영화</h1>
      {loading ? (
        <p>영화를 불러오는 중입니다...</p>
      ) : (
        <div>
          {movies.map((movie) => (
            <div key={movie.id} style={{ color: 'white' }}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <h2>{movie.title}</h2>
              <p>개봉일: {movie.release_date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopRated;
