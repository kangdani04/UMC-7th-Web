// components/Card.jsx
import React from 'react';
import * as S from '../styles/movies.style.js';

const Card = ({ movie }) => {
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500/";

  return (
    <S.CardContainer>
      <S.MovieImage src={`${IMG_BASE_URL}${movie.poster_path}`} alt={movie.title} />
      <S.Overlay>
        <h3 style={{ color: 'white' }}>{movie.title}</h3> {/* 영화 제목을 중앙에 표시 */}
      </S.Overlay>
    </S.CardContainer>
  );
};

export default Card;
