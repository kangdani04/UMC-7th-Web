import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3', // API URL 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트 - 앱 전체에서 로그인 상태를 관리
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [accountId, setAccountId] = useState(localStorage.getItem('accountId') || null); // accountId 상태 추가

  // 로그인 상태 변경 함수
  const login = (email, accessToken, refreshToken) => {
    setIsLogin(true);
    setAccessToken(accessToken);
    localStorage.setItem('accessToken', accessToken);  // 로컬 스토리지에 토큰 저장
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('email', email);
  };

  // 로그아웃 함수
  const logout = () => {
    setIsLogin(false);
    setAccessToken(null);
    setAccountId(null); // 로그아웃 시 accountId를 초기화
    localStorage.removeItem('email');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accountId');
  };

  useEffect(() => {
    // accessToken이 있고 accountId가 없을 때만 accountId를 가져오도록 수정
    if (accessToken && !accountId) {
      console.log('Fetching account ID...'); // 디버깅용 로그 추가
      const fetchAccountId = async () => {
        try {
          const response = await axiosInstance.get('/account', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log('Received account ID:', response.data); // API 응답 로그
          setAccountId(response.data.id);
          localStorage.setItem('accountId', response.data.id);
        } catch (error) {
          console.error('계정 정보를 가져오는 데 실패했습니다:', error);
          console.error('Error details:', error.response || error.message); // 오류 세부 정보 출력
        }
      };
      fetchAccountId();
    } else {
      console.log('No accessToken or accountId exists, skipping API call');
    }
  }, [accessToken, accountId]); // accessToken 또는 accountId가 변경될 때만 실행

  return (
    <AuthContext.Provider value={{ isLogin, accessToken, accountId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 사용하는 커스텀 훅
export const useAuth = () => {
  return useContext(AuthContext);
};
