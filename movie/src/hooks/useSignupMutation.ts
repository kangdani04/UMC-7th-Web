import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstanceBE } from "../apis/axios-instance-BE";

// 요청 데이터 타입 정의
type SignupRequest = {
  email: string;
  password: string;
  repassword: string;
};

// 응답 데이터 타입 정의
type SignupResponse = {
  id: string;
  email: string;
  createdAt: string;
};

// 회원가입 요청 함수
const signupUser = async (formData: SignupRequest): Promise<SignupResponse> => {
  const response = await axiosInstanceBE.post<SignupResponse>("/auth/register", {
    email: formData.email,
    password: formData.password,
    passwordCheck: formData.repassword,
  });
  return response.data;
};

// useMutation 훅
const useSignupMutation = (): UseMutationResult<
  SignupResponse,
  unknown, // 에러 타입 (필요하면 구체적으로 지정 가능)
  SignupRequest,
  unknown // Context 타입
> =>
  useMutation<SignupResponse, unknown, SignupRequest>({
    mutationFn: signupUser, // 요청 함수 지정
    onSuccess: (data) => {
      console.log("회원가입 성공:", data);
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
    },
  });

export default useSignupMutation;
