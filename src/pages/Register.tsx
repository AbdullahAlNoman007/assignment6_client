import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button, Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCreateSellerMutation } from "../redux/features/userManagement/userManagement.api";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Register = () => {
    const navigate = useNavigate()
    const defaultValues = {
        email: '@gmail.com',
        password: 'ASD123!@#asd',
        confirmpassword: 'ASD123!@#asd',
    };

    const [createSeller] = useCreateSellerMutation()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const info = {
            ...data,
            role: 'seller'
        }
        const toastId = toast.loading('Creating...')
        try {
            const res = await createSeller(info).unwrap()
            if (res.success) {
                toast.success(res.message, { id: toastId })
            }
            navigate('/login')
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId })
        }

    }

    return (
        <Row justify="center" align="middle" style={{ height: '100vh' }} >
            <Col span={6}>
                <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                    <PHInput type="text" name="name" label="Name" />
                    <PHInput type="text" name="email" label="Email" />
                    <PHInput type="password" name="password" label="Password" />
                    <PHInput type="password" name="confirmpassword" label="Confirm Password" />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
                <p style={{ marginTop: '15px' }} >Already have an account? <Link to='/login'>login</Link></p>
            </Col>

        </Row>
    );

};

export default Register;