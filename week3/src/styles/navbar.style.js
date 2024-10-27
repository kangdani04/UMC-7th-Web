import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Navbar의 스타일을 위한 컨테이너
export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between; // 좌우로 정렬
  align-items: center; // 수직 중앙 정렬
  padding: 10px; // 패딩
  background-color: #343a40; // 배경 색상
  color: white; // 텍스트 색상
`;

// 로고 스타일
export const Logo = styled.h1`
  font-size: 1.5rem; // 로고 크기
  color: #d5006d; // 로고 텍스트 색상
  text-decoration: none; // 링크 기본 스타일 제거
  padding: 10px 20px;
  cursor: pointer;
`;

// 버튼 컨테이너
export const ButtonContainer = styled.div`
  display: flex; // 버튼을 가로로 정렬
`;

// 버튼 스타일
export const NavButton = styled.button`
  margin-left: 1rem; // 버튼 간격
  padding: 0.5rem 1rem; // 버튼 패딩
  color: white; // 버튼 텍스트 색상
  text-decoration: none; // 링크 기본 스타일 제거
  border: 1px solid white; // 테두리
  border-radius: 4px; // 모서리 둥글게
  transition: background-color 0.3s ease; // 호버 시 배경 색상 변경 효과

  &:hover {
    background-color: rgba(255, 255, 255, 0.1); // 호버 시 배경 색상
  }
`;
