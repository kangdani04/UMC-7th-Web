// MoviesCategory.jsx
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';

// 스타일 정의
const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const CategoryBox = styled.div`
  width: 150px;
  cursor: pointer;
  text-align: center;

  &:hover {
    opacity: 0.8;
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: auto;
`;

const CategoryText = styled.p`
  color: white;
  margin-top: 8px;
`;

const MoviesCategory = ({ onCategorySelect }) => {
  const categories = [
    { name: '현재 상영중인', path: 'now-playing' },
    { name: '인기있는', path: 'popular' },
    { name: '높은 평가를 받은', path: 'top-rated' },
    { name: '개봉 예정중인', path: 'upcoming' },
  ];

  return (
    <CategoryContainer>
      {categories.map((category) => (
        <CategoryBox key={category.name} onClick={() => onCategorySelect(category.path)}>
          <CategoryImage src={`../../images${category.path}.jpg`} alt={category.name} />
          <CategoryText>{category.name}</CategoryText>
        </CategoryBox>
      ))}
    </CategoryContainer>
  );
};

export default MoviesCategory;
