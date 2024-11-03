// SignUpPage.jsx
import styled from 'styled-components';
import useForm from '../hooks/use-form.js';
import * as yup from 'yup';

// 유효성 검사 스키마 정의
const schema = yup.object().shape({
  email: yup
    .string()
    .email('유효한 이메일 형식이 아닙니다.')
    .required('이메일은 필수 입력 요소입니다.'),
  password: yup
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 최대 16자 이하이어야 합니다.')
    .required('비밀번호는 필수 입력 요소입니다.'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수 입력 요소입니다.'),
});

// 유효성 검사 함수
const validateSignUp = (values) => {
  try {
    schema.validateSync(values, { abortEarly: false });
    return {}; // 유효성 검사가 성공하면 에러 없음
  } catch (err) {
    return err.inner.reduce((errors, error) => {
      errors[error.path] = error.message;
      return errors;
    }, {});
  }
};

const SignUpPage = () => {
  const signUp = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordCheck: '',
    },
    validate: validateSignUp,
  });

  const handlePressSignUp = () => {
    console.log(signUp.values);
  };

  return (
    <Container>
      <Input
        error={signUp.touched.email && signUp.errors.email}
        type="email"
        placeholder="이메일을 입력해주세요."
        {...signUp.getTextInputProps('email')}
      />
      {signUp.touched.email && signUp.errors.email && (
        <ErrorText>{signUp.errors.email}</ErrorText>
      )}

      <Input
        error={signUp.touched.password && signUp.errors.password}
        type="password"
        placeholder="비밀번호를 입력해주세요."
        {...signUp.getTextInputProps('password')}
      />
      {signUp.touched.password && signUp.errors.password && (
        <ErrorText>{signUp.errors.password}</ErrorText>
      )}

      <Input
        error={signUp.touched.passwordCheck && signUp.errors.passwordCheck}
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        {...signUp.getTextInputProps('passwordCheck')}
      />
      {signUp.touched.passwordCheck && signUp.errors.passwordCheck && (
        <ErrorText>{signUp.errors.passwordCheck}</ErrorText>
      )}

      <Button onClick={handlePressSignUp}>회원가입</Button>
    </Container>
  );
};

export default SignUpPage;

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: -8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
