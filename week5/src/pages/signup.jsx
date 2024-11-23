// signup.jsx
import useForm from '../hooks/useCustomForm.js';
import styled from 'styled-components';
import { validateSignUp } from '../utils/validate';
import { axiosInstanceBE } from '../apis/axios-instance-BE';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const navigate = useNavigate();

    // useForm을 사용하여 폼 상태 및 유효성 검사 관리
    const signup = useForm({
        initialValue: {
            email: '',
            password: '',
            repassword: '',
        },
        validate: validateSignUp,
    });

    // useMutation 훅 사용
    const signupMutation = useSignupMutation();

    // 회원가입 버튼 클릭 핸들러
    const handlePressSignup = () => {
        if (signupMutation.isLoading) return;

        signupMutation.mutate(
            {
                email: signup.values.email,
                password: signup.values.password,
                repassword: signup.values.repassword,
            },
            {
                onSuccess: () => {
                    console.log('회원가입 성공');
                    navigate('/login');
                },
                onError: (error) => {
                    console.error('회원가입 실패:', error.response?.data?.message || error.message);
                    alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
                },
            }
        );
    };

    // 버튼 비활성화 조건
    const isDisabled =
        !!signup.errors.email ||
        !!signup.errors.password ||
        !!signup.errors.repassword ||
        !!signup.errors.birth ||
        signupMutation.isLoading;

    return (
        <SignUpForm>
            <Title>회원가입</Title>
            <Input
                $error={signup.touched.email && signup.errors.email}
                type="email"
                placeholder="이메일을 입력해주세요"
                {...signup.getTextInputProps('email')}
            />
            {signup.touched.email && signup.errors.email && <ErrorText>{signup.errors.email}</ErrorText>}

            <Input
                $error={signup.touched.password && signup.errors.password}
                type="password"
                placeholder="비밀번호를 입력해주세요"
                {...signup.getTextInputProps('password')}
            />
            {signup.touched.password && signup.errors.password && <ErrorText>{signup.errors.password}</ErrorText>}

            <Input
                $error={signup.touched.repassword && signup.errors.repassword}
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
                {...signup.getTextInputProps('repassword')}
            />
            {signup.touched.repassword && signup.errors.repassword && (
                <ErrorText>{signup.errors.repassword}</ErrorText>
            )}

            <Button onClick={handlePressSignup} type="submit" disabled={isDisabled}>
                {signupMutation.isLoading ? '가입 중...' : '가입하기'}
            </Button>
        </SignUpForm>
    );
};

export default SignupPage;

const SignUpForm=styled.div`
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

const ErrorText=styled.h1`
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