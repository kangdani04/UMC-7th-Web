// src/pages/Upcoming.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Upcoming = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming`, {
            params: {
              api_key: process.env.REACT_APP_TMDB_API_KEY,
              language: 'ko-KR',
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingMovies();
  }, []);

  return (
    <div>
      <h1 style={{ color: 'white' }}>개봉 예정중인 영화</h1>
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

export default Upcoming;
