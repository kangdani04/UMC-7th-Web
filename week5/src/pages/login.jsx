import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import useForm from '../hooks/useCustomForm';
import { validateLogin } from '../utils/validate';
import { axiosInstanceBE, setAuthToken } from '../apis/axios-instance-BE';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query'; // react-query import

const fetchUserInfo = async (accessToken) => {
  setAuthToken(accessToken); // 토큰 설정
  const response = await axiosInstanceBE.get('/user/me'); // API 호출
  return response.data; // 유저 데이터 반환
};

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // AuthContext에서 login 함수 사용
  
    const loginForm = useForm({
      initialValue: {
        email: '',
        password: '',
      },
      validate: validateLogin,
    });
  
    // useLoginMutation 훅 사용
    const loginMutation = useLoginMutation();
  
    const handlePressLogin = async () => {
      try {
        // 로그인 요청
        const { accessToken, refreshToken } = await loginMutation.mutateAsync({
          email: loginForm.values.email,
          password: loginForm.values.password,
        });

        // 로그인 성공 시, userInfo를 가져오는 요청 추가
        const userInfoResponse = await axiosInstanceBE.get('/user/me');
        const email = userInfoResponse.data.email;
        
        // 로그인 정보 AuthContext에 저장
        login(email, accessToken, refreshToken);
  
        // 메인 페이지로 이동
        navigate('/');
      } catch (error) {
        console.error('로그인 실패:', error);
        alert('로그인에 실패했습니다. 다시 시도해 주세요.');
      }
    };
  
    const isDisabled =
      !!loginForm.errors.email ||
      !!loginForm.errors.password ||
      !loginForm.values.email ||
      !loginForm.values.password ||
      loginMutation.isLoading;

    return (
      <LoginForm>
        <Title>로그인</Title>
        <Input
          error={loginForm.touched.email && loginForm.errors.email}
          type={'email'}
          placeholder={'이메일을 입력해주세요'}
          {...loginForm.getTextInputProps('email')}
        />
        {loginForm.touched.email && loginForm.errors.email && (
          <ErrorText>{loginForm.errors.email}</ErrorText>
        )}
  
        <Input
          error={loginForm.touched.password && loginForm.errors.password}
          type={'password'}
          placeholder={'비밀번호를 입력해주세요'}
          {...loginForm.getTextInputProps('password')}
        />
        {loginForm.touched.password && loginForm.errors.password && (
          <ErrorText>{loginForm.errors.password}</ErrorText>
        )}
  
        <Button onClick={handlePressLogin} type={'submit'} disabled={isDisabled}>
          {loginMutation.isLoading ? '로그인 중...' : '로그인'}
        </Button>
      </LoginForm>
    );
  }; 

export default LoginPage;

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

const Input = styled.input`
  margin: 10px 0;
  padding: 0px;
  width: 300px;
  height: 45px;
  border: 1px solid #ccc;
  border-radius: 4px;

  border: ${(props) => (props.$error ? '2px solid red' : '1px solid #ccc')};

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

const Button = styled.button`
  background-color: ${({ disabled }) => (disabled ? '#808080' : '#CD4275')};
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