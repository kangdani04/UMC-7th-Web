import React from "react";
import useForm from "../hooks/useCustomForm";
import styled from "styled-components";
import { validateSignUp } from "../utils/validate";
import { axiosInstanceBE } from "../apis/axios-instance-BE";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const signup = useForm({
    initialValue: {
      email: "",
      password: "",
      repassword: "",
      birth: "",
    },
    validate: validateSignUp,
  });

  const handlePressSignup = async () => {
    console.log(
      signup.values.email,
      signup.values.password,
      signup.values.repassword,
      signup.values.birth
    );
    try {
      const response = await axiosInstanceBE.post("/auth/register", {
        email: signup.values.email,
        password: signup.values.password,
        passwordCheck: signup.values.repassword,
      });
      console.log("회원가입 성공: ", response.data);
      navigate("/login");
    } catch (error) {
      console.log("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 회원가입 버튼 비활성화 조건
  const isDisabled =
    !!signup.errors.email ||
    !!signup.errors.password ||
    !!signup.errors.repassword ||
    !!signup.errors.birth;

  return (
    <SignUpForm>
      <Title>회원가입</Title>

      <Input
        $error={signup.touched.email && signup.errors.email}
        type="email"
        placeholder="이메일을 입력해주세요"
        {...signup.getTextInputProps("email")}
      />
      {signup.touched.email && signup.errors.email && (
        <ErrorText>{signup.errors.email}</ErrorText>
      )}

      <Input
        $error={signup.touched.password && signup.errors.password}
        type="password"
        placeholder="비밀번호를 입력해주세요"
        {...signup.getTextInputProps("password")}
      />
      {signup.touched.password && signup.errors.password && (
        <ErrorText>{signup.errors.password}</ErrorText>
      )}

      <Input
        $error={signup.touched.repassword && signup.errors.repassword}
        type="password"
        placeholder="비밀번호를 다시 입력해주세요"
        {...signup.getTextInputProps("repassword")}
      />
      {signup.touched.repassword && signup.errors.repassword && (
        <ErrorText>{signup.errors.repassword}</ErrorText>
      )}

      <Input
        $error={signup.touched.birth && signup.errors.birth}
        type="text"
        placeholder="생년월일을 입력하세요. YYYY.MM.DD"
        {...signup.getTextInputProps("birth")}
      />
      {signup.touched.birth && signup.errors.birth && (
        <ErrorText>{signup.errors.birth}</ErrorText>
      )}

      <Button onClick={handlePressSignup} type="submit" disabled={isDisabled}>
        가입하기
      </Button>
    </SignUpForm>
  );
};

export default SignupPage;

// Styled Components
const SignUpForm = styled.div`
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

const ErrorText = styled.h1`
  color: red;
  font-size: 12px;
  text-align: left;
  width: 300px;
`;

const Button = styled.button<{ disabled?: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "gray" : "#CD4275")};
  font-size: 15px;
  width: 300px;
  height: 45px;
  margin-top: 30px;
  border-radius: 4px;
  border: none;
  padding: 10px;
  box-sizing: border-box; /* padding을 포함하여 총 너비를 계산 */
  color: white;
`;
