import styled from 'styled-components';
import { axiosInstanceBE } from '../apis/authAPI.js';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/use-form.js';
import React from 'react';

const SignUpPage = () => {
  const navigate = useNavigate();  // 페이지 이동을 위한 navigate
  const validateSignup = (values) => {
    const errors = {};

    // 이메일 유효성 검사
    if (!values.email) {
      errors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = '유효한 이메일 주소가 아닙니다.';
    }

    // 비밀번호 유효성 검사
    if (!values.password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (values.password.length < 6) {
      errors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
    }

    // 비밀번호 확인 유효성 검사
    if (values.passwordConfirm !== values.password) {
      errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    return errors;
  };

  const signupForm = useForm({
    initialValue: {
      email: '',
      password: '',
      repassword: '',
      birth: '',
    },
    validate: validateSignup,
  });

  // 버튼 비활성화 조건을 더 명확히 처리
  const isDisabled = !!signupForm.errors.email || 
    !!signupForm.errors.password || 
    !!signupForm.errors.passwordConfirm ||
    !signupForm.values.email || 
    !signupForm.values.password || 
    !signupForm.values.repassword;

  const handlePressSignup = async () => {
    try {
      const response = await axiosInstanceBE.post('/auth/register', {
        email: signupForm.values.email,
        password: signupForm.values.password,
        passwordCheck: signupForm.values.repassword,
      });
      console.log("회원가입 성공: ", response.data);
      navigate('/login');  // 로그인 페이지로 이동
    } catch (error) {
      console.log("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // useEffect를 통해 콘솔 로그를 최소화 (디버그 시에만 로그를 출력)
  React.useEffect(() => {
    console.log('Form Values: ', signupForm.values);
    console.log('Form Errors: ', signupForm.errors);
  }, [signupForm.values, signupForm.errors]);

  return (
    <SignUpForm>
      <Title>회원가입</Title>
      <Input
        error={signupForm.touched.email && signupForm.errors.email}
        type="email"
        placeholder="이메일을 입력해주세요"
        {...signupForm.getTextInputProps('email')}
      />
      {signupForm.touched.email && signupForm.errors.email && (
        <ErrorText>{signupForm.errors.email}</ErrorText>
      )}
      <Input
        error={signupForm.touched.password && signupForm.errors.password}
        type="password"
        placeholder="비밀번호를 입력해주세요"
        {...signupForm.getTextInputProps('password')}
      />
      {signupForm.touched.password && signupForm.errors.password && (
        <ErrorText>{signupForm.errors.password}</ErrorText>
      )}
      <Input
        error={signupForm.touched.repassword && signupForm.errors.repassword}
        type="password"
        placeholder="비밀번호를 다시 입력해주세요"
        {...signupForm.getTextInputProps('repassword')}
      />
      {signupForm.touched.repassword && signupForm.errors.repassword && (
        <ErrorText>{signupForm.errors.repassword}</ErrorText>
      )}
      <Input
        error={signupForm.touched.birth && signupForm.errors.birth}
        type="text"
        placeholder="생년월일을 입력하세요. YYYY.MM.DD"
        {...signupForm.getTextInputProps('birth')}
      />
      {signupForm.touched.birth && signupForm.errors.birth && (
        <ErrorText>{signupForm.errors.birth}</ErrorText>
      )}
      <Button onClick={handlePressSignup} type="submit" disabled={isDisabled}>
        가입하기
      </Button>
    </SignUpForm>
  );
};

export default SignUpPage;

// 스타일 컴포넌트
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

const Input = styled.input`
  margin: 10px 0;
  padding: 8px;
  width: 300px;
  border-radius: 4px;
  border: ${(props) => (props.error ? '2px solid red' : '1px solid #ccc')};
  &:focus {
    border-color: #007bff;
  }
`;

const ErrorText = styled.h1`
  color: red;
  font-size: 12px;
  margin-top: -8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: ${({ disabled }) => (disabled ? 'gray' : '#CD4275')};
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

