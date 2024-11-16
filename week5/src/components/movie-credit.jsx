import styled from "styled-components";
import { useQuery } from '@tanstack/react-query';
import Credit from "./credit";
import CardSkeleton from "../components/Card/Skeleton/card-skeleton"; // Skeleton UI

const fetchMovieCredits = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch movie credits');
    }
    return response.json();
};

const MovieCredit = ({ url }) => {
    const { data: credit, isLoading, isError, error } = useQuery(
        ['movieCredits', url], // Query Key
        () => fetchMovieCredits(`${import.meta.env.VITE_TMDB_MOVIE_API_URL}${url}`), // Fetch Function
        {
            staleTime: 1000 * 60 * 5, // 5 minutes
            cacheTime: 1000 * 60 * 10, // 10 minutes
        }
    );

    // 로딩 처리 - Skeleton UI
    if (isLoading) {
        return (
            <SkeletonWrapper>
                {Array.from({ length: 6 }).map((_, index) => (
                    <CardSkeleton key={index} />
                ))}
            </SkeletonWrapper>
        );
    }

    // 에러 처리
    if (isError) {
        return <ErrorMessage>Error: {error.message}</ErrorMessage>;
    }

    // 데이터 유효성 확인
    if (!credit) {
        return <ErrorMessage>No credit data available.</ErrorMessage>;
    }

    return (
        <Block>
            {credit.cast?.map((creditItem) => (
                <Credit key={creditItem.id} credit={creditItem} />
            ))}
        </Block>
    );
};

export default MovieCredit;

const Block = styled.div`
    display: flex;
    flex-wrap: wrap;
    color: white;
    background-color: black;
    padding: 20px;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const SkeletonWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 20px;
    justify-content: center;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
`;
