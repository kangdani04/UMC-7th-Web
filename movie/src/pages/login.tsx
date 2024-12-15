import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import useForm from "../hooks/useCustomForm";
import { validateLogin } from "../utils/validate";
import { axiosInstanceBE, setAuthToken } from "../apis/axios-instance-BE.ts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

// 유저 데이터 타입 정의
type UserInfo = {
  email: string;
  name: string;
};

// fetchUserInfo 함수 타입 정의
const fetchUserInfo = async (accessToken: string): Promise<UserInfo> => {
  setAuthToken(accessToken); // 토큰 설정
  const response = await axiosInstanceBE.get<UserInfo>("/user/me"); // API 호출
  return response.data; // 유저 데이터 반환
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // AuthContext에서 login 함수 사용

  // useForm 훅을 사용하여 폼 상태 관리
  const loginForm = useForm({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });

  const { data: userInfo, isLoading, isError, error } = useQuery<UserInfo, Error>({
    queryKey: ["userInfo", loginForm.values.email],
    queryFn: () => fetchUserInfo(loginForm.values.email),
    enabled: false, // 로그인 이후에만 실행
  });

  // 로그인 처리 함수
  const handlePressLogin = async () => {
    try {
      const response = await axiosInstanceBE.post<{
        accessToken: string;
        refreshToken: string;
      }>("/auth/login", {
        email: loginForm.values.email,
        password: loginForm.values.password,
      });

      const { accessToken, refreshToken } = response.data;

      setAuthToken(accessToken); // 토큰 설정

      const userInfoResponse = await fetchUserInfo(accessToken);
      const email = userInfoResponse.email;

      login(email, accessToken, refreshToken); // AuthContext에 저장

      navigate("/"); // 메인 페이지로 이동
    } catch (error: any) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  const isDisabled =
    !!loginForm.errors.email ||
    !!loginForm.errors.password ||
    !loginForm.values.email ||
    !loginForm.values.password;

  return (
    <LoginForm>
      <Title>로그인</Title>
      <Input
        $error={loginForm.touched.email && loginForm.errors.email}
        type="email"
        placeholder="이메일을 입력해주세요"
        {...loginForm.getTextInputProps("email")}
      />
      {loginForm.touched.email && loginForm.errors.email && (
        <ErrorText>{loginForm.errors.email}</ErrorText>
      )}

      <Input
        $error={loginForm.touched.password && loginForm.errors.password}
        type="password"
        placeholder="비밀번호를 입력해주세요"
        {...loginForm.getTextInputProps("password")}
      />
      {loginForm.touched.password && loginForm.errors.password && (
        <ErrorText>{loginForm.errors.password}</ErrorText>
      )}

      <Button onClick={handlePressLogin} type="submit" disabled={isDisabled}>
        로그인
      </Button>
    </LoginForm>
  );
};

export default LoginPage;

// 스타일링
const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px;
`;

const Title = styled.h1`
  color: white;
`;

const Input = styled.input<{ $error?: boolean }>`
  margin: 10px 0;
  padding: 0px;
  width: 300px;
  height: 45px;
  border: ${(props) => (props.$error ? "2px solid red" : "1px solid #ccc")};
  border-radius: 4px;

  &:focus {
    border-color: #007bff;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  text-align: left;
  width: 300px;
`;

const Button = styled.button<{ disabled?: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "#808080" : "#CD4275")};
  font-size: 15px;
  width: 300px;
  height: 45px;
  margin-top: 30px;
  border-radius: 4px;
  border: none;
  padding: 10px;
  box-sizing: border-box;
  color: white;
`;
