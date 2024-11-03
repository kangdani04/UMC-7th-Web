import styled from "styled-components";
import useForm from "../hooks/use-form.js";
import {validateLogin} from "../utils/validate.js";

const LoginPage = () => {
    const login = useForm( {
        initialValue:{
            email: '',
            password: '',
        },
        validate: validateLogin
    })
    
    console.log(login.values, login.errors, login.touched)

    const handlePressLogin = () => {
        console.log(login.values.email, login.values.password)
    }
    return (
        <Container>
            <Input error={login.touched.email && login.errors.email} type={'email'} placeholder={'이메일을 입력해주세요.'} {...login.getTextInputProps('email')}/>
            {login.touched.email && login.errors.email && <ErrorText>{login.errors.email}</ErrorText>}
            <Input error={login.touched.password && login.errors.password}type={'password'} placeholder={'비밀번호를 입력해주세요.'} {...login.getTextInputProps('password')}/>
            {login.touched.password && login.errors.password && <ErrorText>{login.errors.password}</ErrorText>}

            <button onClick={handlePressLogin}>로그인</button>
        </Container>
    )
}

export default LoginPage;

const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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


