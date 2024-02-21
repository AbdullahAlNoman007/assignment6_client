import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useCreateManagerMutation } from "../../../redux/features/userManagement/userManagement.api";

const CreateManager = () => {
    const defaultValue = {
        email: "@gmail.com",
        password: "ASD123!@#asd",
        confirmpassword: "ASD123!@#asd"
    }

    const [createManager] = useCreateManagerMutation()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const info = {
            ...data,
            role: 'manager'
        }
        const toastId = toast.loading('Creating...')
        try {
            const res = await createManager(info).unwrap()
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

export default CreateManager;