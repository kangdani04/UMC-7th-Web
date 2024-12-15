const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

// 유효성 검사 대상 데이터 타입 정의
type UserValues = {
  email: string;
  password: string;
};

// 반환되는 에러 메시지 타입 정의
type UserErrors = {
  email: string;
  password: string;
};

// 유효성 검사 함수
function validateUser(values: UserValues): UserErrors {
  const errors: UserErrors = {
    email: "",
    password: "",
  };

  if (emailPattern.test(values.email) === false) {
    errors.email = "올바른 이메일 형식이 아닙니다. 다시 확인해주세요.";
  }

  if (values.password.length < 8 || values.password.length > 16) {
    errors.password = "비밀번호는 8~16자 사이로 입력해주세요.";
  }

  return errors;
}

// 회원가입 유효성 검사 함수
function validateSignUp(values: UserValues): UserErrors {
  return validateUser(values);
}

// 로그인 유효성 검사 함수
function validateLogin(values: UserValues): UserErrors {
  return validateUser(values);
}

export { validateLogin, validateSignUp };
