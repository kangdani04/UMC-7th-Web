// login.jsx
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import styled from 'styled-components';
import useForm from '../hooks/useCustomForm';
import { validateLogin } from '../utils/validate';
import { axiosInstanceBE, setAuthToken } from '../apis/axios-instance-BE';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {

    const navigate=useNavigate();
    const { login } = useAuth();  // AuthContext에서 login 함수 사용
    
    const loginForm=useForm({
        initialValue: {
            email:'',
            password:'',
        },
        validate: validateLogin
    })

    const handlePressLogin=async ()=>{
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
        
    }

    
    // 로그인 버튼 비활성화 조건
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
    margin:10px 0;
    padding: 0px;
    width:300px;
    height:45px;
    border:1px solid #ccc;
    border-radius:4px;

    border: ${props=>(props.$error?'2px solid red':'1px solid #ccc')};

    &:focus {
        border-color:#007bff;
    }
`

const ErrorText=styled.div`
    color:red;
    font-size:12px;
    text-align: left; 
    width: 300px;
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