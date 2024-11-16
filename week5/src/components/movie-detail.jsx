import { useQuery } from '@tanstack/react-query';
import styled from "styled-components";
import CardSkeleton from "../components/Card/Skeleton/card-skeleton"; // Skeleton UI

const fetchMovieDetail = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch movie details');
    }
    return response.json();
};

const MovieDetail = ({ url }) => {
    const { data: movie, isLoading, isError, error } = useQuery(
        ['movieDetail', url], // Query Key
        () => fetchMovieDetail(`${import.meta.env.VITE_TMDB_MOVIE_API_URL}${url}`), // Fetch Function
        {
            staleTime: 1000 * 60 * 5, // 5 minutes
            cacheTime: 1000 * 60 * 10, // 10 minutes
        }
    );

    // 로딩 처리 - Skeleton UI
    if (isLoading) {
        return (
            <SkeletonWrapper>
                <CardSkeleton />
            </SkeletonWrapper>
        );
    }

    // 에러 처리
    if (isError) {
        return <ErrorMessage>Error: {error.message}</ErrorMessage>;
    }

    // 데이터 유효성 확인
    if (!movie) {
        return <ErrorMessage>No movie data available.</ErrorMessage>;
    }

    // Movie 데이터 렌더링
    return (
        <Detail>
            <BackgroundImage backdrop_path={movie.backdrop_path}>
                <Text>
                    <h2>{movie.title}</h2>
                    <div>평균 : {movie.vote_average}</div>
                    <div>{movie.release_date}</div>
                    <div>{movie.runtime} minutes</div>
                    <Content>
                        <div>{movie.overview}</div>
                    </Content>
                </Text>
            </BackgroundImage>
        </Detail>
    );
};

export default MovieDetail;

const Detail = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    background-color: black;
`;

const BackgroundImage = styled.div`
    background-size: cover;
    background-image: 
        linear-gradient(to left,
                        rgba(0, 0, 0, 0) 0%,
                        rgba(0, 0, 0, 0.5) 50%,
                        rgba(0, 0, 0, 1) 100%),
        url(${props => `https://image.tmdb.org/t/p/w500${props.backdrop_path}`});
    width: 100%;
    height: 500px;
    border-radius: 40px;
    position: relative;
`;

const Text = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-bottom: 2px solid white;
    padding: 10px;
    box-sizing: border-box;
`;

const Content = styled.div`
    font-size: small;
`;

const SkeletonWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 16px;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
`;
