import React from 'react';
import MoviesPage from './pages/MoviesPage.jsx'; // 영화 목록 페이지
import Navbar from './components/Navbar'; // 분리된 Navbar
import Sidebar from './components/Sidebar'; // 분리된 Sidebar
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage.jsx'; // 로그인 페이지 
import SignupPage from './pages/SignupPage.jsx'; // 회원가입 페이지 
import * as S from './styles/movies.style.js'; // 스타일 파일
import MoviesCategoryPage from './pages/MoviesCategoryPage';
import NowPlaying from './pages/NowPlaying';
import Popular from './pages/Popular';
import TopRated from './pages/TopRated';
import Upcoming from './pages/Upcoming';
import { GlobalStyle } from './styles/global';

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <S.Layout>
        <Navbar />  {/* 최상단에 Navbar */}
        <S.ContentWrapper>
          <Sidebar />  {/* 좌측에 Sidebar */}
          <S.MainContent>
            <Routes>
                <Route path="/" element={<MoviesPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/movies" element={<MoviesCategoryPage />} /> // 기본 카테고리 페이지
                <Route path="/movies/:category" element={<MoviesCategoryPage />} /> // 카테고리별 영화 페이지
                <Route path="/movies/now-playing" element={<NowPlaying />} />
                <Route path="/movies/popular" element={<Popular />} />
                <Route path="/movies/top-rated" element={<TopRated />} />
                <Route path="/movies/upcoming" element={<Upcoming />} />
            </Routes>
          </S.MainContent>
        </S.ContentWrapper>
      </S.Layout>
    </Router>
  );
};

export default App;
