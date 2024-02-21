import { Button, Col, Flex } from "antd";
import PHInput from "../../../components/form/PHInput";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useCreateSuperAdminMutation } from "../../../redux/features/userManagement/userManagement.api";



const CreateSuperAdmin = () => {
    const defaultValue = {
        email: "@gmail.com",
        password: "ASD123!@#asd",
        confirmpassword: "ASD123!@#asd"
    }
    const [createSuperAdmin] = useCreateSuperAdminMutation()
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const info = {
            ...data,
            role: 'superAdmin'
        }
        const toastId = toast.loading('Creating...')
        try {
            const res = await createSuperAdmin(info).unwrap()
            if (res.success) {
                toast.success(res.message, { id: toastId })
            }
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId })
        }

    }

    return (
        <Flex justify="center" align="center" >
            <Col span={16}>
                <PHForm onSubmit={onSubmit} defaultValues={defaultValue}>
                    <PHInput type="text" name="name" label="Name" />
                    <PHInput type="text" name="email" label="Email" />
                    <PHInput type="password" name="password" label="Password" />
                    <PHInput type="password" name="confirmpassword" label="Confirm Password" />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateSuperAdmin;