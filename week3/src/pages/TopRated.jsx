// src/pages/TopRated.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import * as S from '../styles/movies.style.js'; // 스타일 파일 경로에 맞게 수정

const TopRated = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/movie/top_rated', {
                    params: {
                        api_key: import.meta.env.VITE_TMDB_API_KEY,
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

export default TopRated;