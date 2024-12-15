import React from "react";
import MovieList from "../components/movie-list";

const HomePage: React.FC = () => {
  return (
    <MovieList
      url={`${import.meta.env.VITE_TMDB_MOVIE_API_URL}/movie/top_rated`}
    />
  );
};

export default HomePage;
