import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as S from '../styles/navbar.style.js';

const NavbarContainer = styled.div`
  background-color: #333; // 배경색
  color: white; // 글자색
  padding: 10px; // 패딩
  text-align: center; // 중앙 정렬
`;

const Navbar = () => {
  return (
    <S.NavbarContainer>
       <S.Logo as={Link} to="/">yongcha</S.Logo> {/* 로고 클릭 시 홈으로 이동 */}
      <S.ButtonContainer>
        <S.NavButton as={Link} to="/login">로그인</S.NavButton>
        <S.NavButton as={Link} to="/signup">회원가입</S.NavButton>
      </S.ButtonContainer>
    </S.NavbarContainer>
  );
};

export default Navbar;
