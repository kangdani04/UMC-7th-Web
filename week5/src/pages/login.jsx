import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { axiosInstanceBE, setAuthToken } from '../apis/authAPI';
import { useAuth } from '../context/AuthContext';
import useForm from '../hooks/use-form';

const LoginPage = () => {
    const navigate = useNavigate();  // 페이지 이동을 위한 navigate
    const { login } = useAuth();
    
    const validateLogin = (values) => {
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
    
        return errors;
    };
    
    const loginForm=useForm({
        initialValue: {
            email:'',
            password:'',
        },
        validate: validateLogin
    })

    const handlePressLogin = async () => {
        console.log(loginForm.values.email, loginForm.values.password);
        try{
            const response=await axiosInstanceBE.post('/auth/login',{
                email:loginForm.values.email,
                password: loginForm.values.password,
            })
            console.log("로그인 성공: ", response.data);

            //---------------회원정보 요청--------------------//
            setAuthToken(response.data.accessToken);
            const userInfoResponse= await axiosInstanceBE.get('/user/me')

            // 응답에서 user 정보가 있다면 이메일을 로컬 스토리지에 저장
            if (userInfoResponse) {
                const email = userInfoResponse.data.email;  // 이메일 정보 추출
                console.log("유저 이메일: ", email);

                // 로컬 스토리지에 저장
                login(email, response.data.accessToken, response.data.refreshToken);
                //localStorage.setItem('email',email);

                // 메인 페이지로 이동
                navigate('/');
            } else {
                throw new Error("유저 정보를 불러올 수 없습니다.");
            }
        }
        catch(error){
            console.log("로그인 실패:", error);
            alert("로그인에 실패했습니다. 다시 시도해 주세요.");
        }
    };

    const isDisabled = !!loginForm.errors.email || !!loginForm.errors.password || !loginForm.values.email || !loginForm.values.password;

    return(
        <LoginForm>
            <Title>로그인</Title>
            <Input error={loginForm.touched.email && loginForm.errors.email}type={'email'} placeholder={'이메일을 입력해주세요'} 
                            {...loginForm.getTextInputProps('email')} />
            {loginForm.touched.email && loginForm.errors.email && <ErrorText>{loginForm.errors.email}</ErrorText>}
            <Input  error={loginForm.touched.password && loginForm.errors.password} type={'password'} placeholder={'비밀번호를 입력해주세요'} 
                            {...loginForm.getTextInputProps('password')} />
            {loginForm.touched.password && loginForm.errors.password && <ErrorText>{loginForm.errors.password}</ErrorText>}
            <Button onClick={handlePressLogin} type={'submit'} disabled={isDisabled} > 로그인 </Button>
        </LoginForm>
    )
};


export default LoginPage;

const LoginForm=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px;
  
`

const Title=styled.h1`
    color:white;
`

const Input=styled.input`
    margin: 10px 0;
    padding: 8px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;

    border: ${props => props.error ? '4px solid red' : '1px solid #ccc'};

    &:focus {
        border-color: #007bff;
    }
`

const ErrorText=styled.h1`
    color: red;
    font-size: 12px;
`

const Button=styled.button`
    background-color: ${({ disabled }) => (disabled ? 'gray' : '#CD4275')};
    font-size:15px;
    width:300px;
    height:45px;
    margin-top: 30px;
    border-radius:4px;
    border:none;
    padding: 10px;
    box-sizing: border-box; /* padding을 포함하여 총 너비를 계산 */
    color:white;
`

    // login.jsx
    /*import { useForm } from 'react-hook-form';
    import * as yup from 'yup';
    import { yupResolver } from '@hookform/resolvers/yup';
    import React from 'react';
    import styled from 'styled-components';

    const LoginPage = () => {
        // Yup 스키마 수정
        const schema = yup.object().shape({
            email: yup.string().email('올바른 이메일 형식이 아닙니다.').required('이메일을 반드시 입력해주세요.'),
            password: yup.string()
                .min(8, '비밀번호는 8자 이상이어야 합니다.')
                .max(16, '비밀번호는 16자 이하여야 합니다.')
                .required('비밀번호를 입력해주세요.'),
        });

        const { register, handleSubmit, formState: { errors, isValid } } = useForm({
            mode: 'onChange', // 실시간 검증
            resolver: yupResolver(schema),
        });

        const onSubmit = (data) => {
            console.log('폼 데이터 제출');
            console.log(data);
        };

        return (
            <Container>
                <h1>로그인</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputWrapper>
                        <Input
                            type='email'
                            {...register("email")}
                            onFocus={() => {
                                if (errors.email) {
                                    errors.email.message = ''; // 포커스 시 에러 메시지 초기화
                                }
                            }}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            type='password'
                            {...register("password")}
                            onFocus={() => {
                                if (errors.password) {
                                    errors.password.message = ''; // 포커스 시 에러 메시지 초기화
                                }
                            }}
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </InputWrapper>
                    <SubmitButton type='submit' disabled={!isValid}>로그인</SubmitButton>
                </form>
            </Container>
        );
    };

    // Styled Components
    const Container = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    `;

    const InputWrapper = styled.div`
        display: flex;
        flex-direction: column;
        margin-bottom: 20px; 
    `;

    const Input = styled.input`
        padding: 10px;
        width: 300px;
        border: 1px solid #ccc;
        border-radius: 5px;
        transition: border-color 0.3s;

        &:focus {
            border-color: #ff4081; 
        }
    `;

    const ErrorMessage = styled.p`
        color: red;
        margin-top: 5px;
        font-size: 12px;
    `;

    const SubmitButton = styled.button`
        padding: 10px 20px;
        background-color: ${({ disabled }) => (disabled ? 'gray' : '#ff4081')}; 
        color: white;
        border: none;
        border-radius: 5px;
        cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
        transition: background-color 0.3s;

        &:hover {
            background-color: ${({ disabled }) => (disabled ? 'gray' : '#ff0077')}; 
        }
    `;

    export default LoginPage; */


