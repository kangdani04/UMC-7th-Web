import { useQuery } from '@tanstack/react-query';
import MovieList from "../components/movie-list";
import CardSkeleton from "../components/Skeleton/card-skeleton"; // Skeleton UI
import styled from "styled-components";

const fetchMovies = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }
    return response.json();
};

const MoviesPage = ({ url }) => {
    const { data, isLoading, isError, error } = useQuery(
        ['movies', url], // Query Key
        () => fetchMovies(`${import.meta.env.VITE_TMDB_MOVIE_API_URL}${url}`), // Fetch Function
        {
            staleTime: 1000 * 60 * 5, // 5 minutes
            cacheTime: 1000 * 60 * 10, // 10 minutes
        }
    );

    if (isLoading) {
        return (
            <SkeletonWrapper>
                {Array.from({ length: 10 }).map((_, index) => (
                    <CardSkeleton key={index} />
                ))}
            </SkeletonWrapper>
        );
    }

    if (isError) {
        return <ErrorMessage>Error: {error.message}</ErrorMessage>;
    }

    return <MovieList movies={data.results} />;
};

export default MoviesPage;

const SkeletonWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    padding: 16px;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
`;
