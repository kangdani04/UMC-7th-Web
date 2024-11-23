import { useMutation } from '@tanstack/react-query';
import { axiosInstanceBE } from '../apis/axios-instance-BE';

const useSignupMutation = () => {
    return useMutation(async (formData) => {
        const response = await axiosInstanceBE.post('/auth/register', {
            email: formData.email,
            password: formData.password,
            passwordCheck: formData.repassword,
        });
        return response.data;
    });
};

export default useSignupMutation;
