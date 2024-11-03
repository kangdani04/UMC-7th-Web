import MovieList from "../components/movie-list";

const MoviesPage = ({url}) => {
    return (
        
        <MovieList url={`${import.meta.env.VITE_TMDB_MOVIE_API_URL}${url}`}/>
        
    );
};

export default MoviesPage;