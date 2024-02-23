import { Button, Col, Divider, Row } from "antd";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHCheckbox from "../../../components/form/PHCheckbox";
import { useCreatephoneMutation } from "../../../redux/features/getPhone/getPhoneApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { batteryLifeOptions, cameraQualityOptions, colorOptions, operatingSystemOption, phoneBrandOptions, ramOptions, romOptions, screenSizeOptions } from "../../../const";
import { useCurrentToken } from "../../../redux/features/auth/authSlicer";
import { useAppSelector } from "../../../redux/hook";
import { verifyToken } from "../../../utils/verifyToken";
import { Tuser } from "../../../types/program.type";


const AddPhone = () => {
    const [createphone] = useCreatephoneMutation()
    const navigate = useNavigate()
    const token = useAppSelector(useCurrentToken);
    let user: Tuser;
    if (token) {
        user = verifyToken(token) as Tuser
    }
    const defaultValues = {
        name: 'iphone',
        price: 12,
        quantity: 10,
        brand: 'apple',
        model: '15 pro',
        ram: '4GB',
        storageCapacity: "16GB",
        screenSize: "5 inches",
        cameraQuality: "8 MP",
        batteryLife: "7 hours",
        operatingSystem: "iOS",
        waterResistance: false,
        color: "Black",
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...')
        const phoneInfo = {
            ...data,
            price: Number(data.price),
            quantity: Number(data.quantity),
            releaseDate: (data.releaseDate).toISOString()
        };
        try {
            const res = await createphone(phoneInfo).unwrap()
            const success = res.success

            if (!success) {
                throw new Error()
            }
            toast.success(res.message, { id: toastId })
            navigate(`/${user.role}/all-phone`)
        } catch (error: any) {
            toast.error(error?.data?.errorMessage, { id: toastId })
        }
    }

    return (
        <Row>
            <Col span={24}>
                <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                    <Divider>Phone Information</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="name" label="Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="number" name="price" label="Price" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="number" name="quantity" label="Quantity" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect name="brand" label="Brand" options={phoneBrandOptions} />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="model" label="Model" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect name="ram" label="RAM" options={ramOptions} />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect name="storageCapacity" label="ROM" options={romOptions} />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect name="screenSize" label="Screen Size" options={screenSizeOptions} />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect name="cameraQuality" label="Camera Quality" options={cameraQualityOptions} />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect name="batteryLife" label="Battery Life" options={batteryLifeOptions} />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect name="operatingSystem" label="Operating System" options={operatingSystemOption} />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHCheckbox name="waterResistance" label="Water Resistance" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect name="color" label="Color" options={colorOptions} />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHDatePicker name="releaseDate" label="Release Date" />
                        </Col>
                    </Row>
                    <Button htmlType="submit">CREATE</Button>
                </PHForm>

            </Col>
        </Row>
    );
};

export default AddPhone;