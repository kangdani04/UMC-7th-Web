import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import axios from "axios";

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3", // API URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// AuthContext 타입 정의
type AuthContextType = {
  isLogin: boolean;
  accessToken: string | null;
  accountId: string | null;
  login: (email: string, accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

// 초기값 설정
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Props 타입 정의
type AuthProviderProps = {
  children: ReactNode;
};

// AuthProvider 컴포넌트 - 앱 전체에서 로그인 상태를 관리
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [accountId, setAccountId] = useState<string | null>(
    localStorage.getItem("accountId")
  );

  // 로그인 상태 변경 함수
  const login = (email: string, accessToken: string, refreshToken: string) => {
    setIsLogin(true);
    setAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken); // 로컬 스토리지에 토큰 저장
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("email", email);
  };

  // 로그아웃 함수
  const logout = () => {
    setIsLogin(false);
    setAccessToken(null);
    setAccountId(null); // 로그아웃 시 accountId를 초기화
    localStorage.removeItem("email");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accountId");
  };

  useEffect(() => {
    // accessToken이 있고 accountId가 없을 때만 accountId를 가져오도록 수정
    if (accessToken && !accountId) {
      console.log("Fetching account ID..."); // 디버깅용 로그 추가
      const fetchAccountId = async () => {
        try {
          const response = await axiosInstance.get("/account", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log("Received account ID:", response.data); // API 응답 로그
          setAccountId(response.data.id);
          localStorage.setItem("accountId", response.data.id);
        } catch (error: any) {
          console.error("계정 정보를 가져오는 데 실패했습니다:", error);
          console.error("Error details:", error.response || error.message); // 오류 세부 정보 출력
        }
      };
      fetchAccountId();
    } else {
      console.log("No accessToken or accountId exists, skipping API call");
    }
  }, [accessToken, accountId]); // accessToken 또는 accountId가 변경될 때만 실행

  return (
    <AuthContext.Provider
      value={{ isLogin, accessToken, accountId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 사용하는 커스텀 훅
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
