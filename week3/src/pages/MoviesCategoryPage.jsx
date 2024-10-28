// MoviesCategoryPage.jsx
import React, { useEffect, useState } from 'react';
import MoviesCategory from '../components/MoviesCategory';
import axios from 'axios';
import Card from '../components/Card';
import { useParams, useNavigate } from 'react-router-dom';

const categoryOptions = [
  { name: "현재 상영중인", value: "now-playing" },
  { name: "인기 있는", value: "popular" },
  { name: "높은 평가를 받은", value: "top-rated" },
  { name: "개봉 예정중인", value: "upcoming" }
];

const MoviesCategoryPage = () => {
  const { category } = useParams(); // 카테고리 파라미터 가져오기
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCategorySelect = (selectedCategory) => {
    console.log("Selected category:", selectedCategory); // 카테고리가 선택되는지 확인
    navigate(`/movies/${selectedCategory}`);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (!category) return;
      setLoading(true);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${category}`, {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: 'ko-KR',
          },
        });
        console.log("Fetched movies:", response.data.results);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  return (
    <div>
      <MoviesCategory onCategorySelect={handleCategorySelect} />
      <div>
        {categoryOptions.map((option) => (
          <button 
            key={option.value} 
            onClick={() => handleCategorySelect(option.value)}
          >
            {option.name}
          </button>
        ))}
      </div>
      {loading ? (
        <p>영화를 불러오는 중입니다...</p>
      ) : (
        movies.length > 0 ? (
          movies.map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          <p>영화가 없습니다.</p>
        )
      )}
    </div>
  );
};

export default MoviesCategoryPage;
