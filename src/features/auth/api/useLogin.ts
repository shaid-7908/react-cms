import { useMutation } from '@tanstack/react-query';
import { authLogin,type LoginPayload } from './authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner'; // Since you have sonner installed!
//import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useAppDispatch } from '@/store/hooks';

export const useLogin = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return useMutation({
        mutationFn: (data: LoginPayload) => authLogin(data),
        onSuccess: (response) => {
            console.log(response)
            
            // Extract from response data
            const { user, accessToken, refreshToken } = response.data;

            // Dispatch to Redux store
            dispatch(setCredentials({ user, accessToken, refreshToken }));

            // Handle success (e.g., redirect)
            toast.success('Successfully logged in!');
            navigate('/');
        },
        onError: (error) => {
            console.log(error)
            // Handle error natively
            toast.error('Login failed. Please check your credentials.');
        },
    });
};
