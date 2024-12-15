import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isLogin, logout } = useAuth();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    console.log("isLogin 상태:", isLogin);
    if (isLogin) {
      const userEmail = localStorage.getItem("email");
      console.log("이메일 갱신: ", userEmail);
      if (userEmail) {
        setEmail(userEmail.split("@")[0]);
      }
    }
  }, [isLogin]);

  const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
    setEmail(""); // 이메일 상태 초기화
    console.log("로그아웃됨, 이메일 상태 초기화");
    navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <Nav>
      <StyledLink onClick={() => navigate("/")}>
        <Youngcha>YOUNGCHA</Youngcha>
      </StyledLink>
      <Div>
        {isLogin ? ( // 로그인 상태
          <>
            <UserInfo>{email}님 반갑습니다.</UserInfo>
            <StyledLink>
              <Login onClick={handleLogout}>로그아웃</Login>
            </StyledLink>
          </>
        ) : (
          <>
            <StyledLink>
              <Login onClick={() => navigate("login")}>로그인</Login>
            </StyledLink>
            <StyledLink>
              <SignIn onClick={() => navigate("signup")}>회원가입</SignIn>
            </StyledLink>
          </>
        )}
      </Div>
    </Nav>
  );
};

export default Navbar;

// Styled Components
const Nav = styled.nav`
  width: 100%;
  height: 100px;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #282828;
`;

const Youngcha = styled.div`
  color: #ff1493;
  font-weight: 900;
  border: none;
  background-color: transparent;
  padding: 20px;
  font-size: large;
  cursor: pointer;
`;

const Login = styled.div`
  background-color: transparent;
  border: none;
  border-radius: 10px;
  color: white;
  margin: 20px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: rgba(100, 100, 100, 0.8); /* 어두운 회색으로 변경 */
  }
`;

const SignIn = styled.div`
  background-color: #ff1493;
  color: white;
  border: none;
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #d5006d; /* 어두운 핑크색으로 변경 */
  }
`;

const StyledLink = styled.button`
  background-color: transparent;
  margin: 0;
  padding: 0;
  border: none;
  color: inherit;
  display: flex;
  align-items: center;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  color: white;
  font-size: 14px;
  margin-right: 20px;
  padding: 10px;
  font-weight: 500;
`;
