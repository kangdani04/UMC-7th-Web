import { useMutation } from '@tanstack/react-query';
import { axiosInstanceBE, setAuthToken } from '../apis/axios-instance-BE';

// 로그인 요청 처리 함수
const loginUser = async ({ email, password }) => {
  const response = await axiosInstanceBE.post('/auth/login', { email, password });
  const { accessToken, refreshToken } = response.data;
  
  setAuthToken(accessToken); // 토큰 설정
  
  return { accessToken, refreshToken };
};

// useMutation 훅
const useLoginMutation = () => {
    return useMutation({
      mutationFn: async ({ email, password }) => {
        const response = await axiosInstanceBE.post('/auth/login', { email, password });
        const { accessToken, refreshToken } = response.data;
        setAuthToken(accessToken); // 토큰 설정
        return { accessToken, refreshToken };
      },
      onSuccess: (data) => {
        // 로그인 성공 시 처리
        console.log('로그인 성공:', data);
      },
      onError: (error) => {
        // 로그인 실패 시 처리
        console.error('로그인 실패:', error);
        alert('로그인에 실패했습니다. 다시 시도해 주세요.');
      },
    });
  };
  

export default useLoginMutation;
