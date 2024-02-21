import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';

import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PHForm from '../components/form/PHForm';
import PHInput from '../components/form/PHInput';
import { useAppDispatch } from '../redux/hook';
import { setUser } from '../redux/features/auth/authSlicer';
import { Tuser } from '../types/program.type';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const defaultValues = {
        password: 'ASD123!@#asd',
    };

    const [login, { error }] = useLoginMutation();

    console.log(error);

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading('Logging in');

        try {
            const userInfo = {
                email: data.email,
                password: data.password,
            };
            const res = await login(userInfo).unwrap();

            if (res.success) {
                const user = verifyToken(res.data.token) as Tuser;
                dispatch(setUser({ user: user, token: res.data.token }));
                toast.success('Logged in', { id: toastId, duration: 2000 });
                navigate(`/${user.role}/dashboard`);
            }
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message, { id: toastId, duration: 2000 });
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
            <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <PHInput type="text" name="email" label="Email" />
                <PHInput type="password" name="password" label="Password" />
                <Button htmlType="submit">Login</Button>
            </PHForm>
        </Row>
    );
};

export default Login;
