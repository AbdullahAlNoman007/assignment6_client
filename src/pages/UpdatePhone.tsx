import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useUpdatephoneMutation } from "../redux/features/getPhone/updatePhoneApi";
import { Button, Col, Divider, Row } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import PHSelect from "../components/form/PHSelect";
import PHCheckbox from "../components/form/PHCheckbox";
import PHDatePicker from "../components/form/PHDatePicker";
import { batteryLifeOptions, cameraQualityOptions, colorOptions, operatingSystemOption, phoneBrandOptions, ramOptions, romOptions, screenSizeOptions } from "../const";
import { useGetSinglePhoneQuery } from "../redux/features/getPhone/getPhoneApi";
import { TproductData, Tuser } from "../types/program.type";
import { useAppSelector } from "../redux/hook";
import { useCurrentToken } from "../redux/features/auth/authSlicer";
import { verifyToken } from "../utils/verifyToken";



const UpdatePhone = () => {
    const { id } = useParams();
    const { data: productInfo, isFetching, isLoading } = useGetSinglePhoneQuery(id)
    const [updatephone] = useUpdatephoneMutation()
    const navigate = useNavigate()
    const token = useAppSelector(useCurrentToken);
    let user: Tuser;
    if (token) {
        user = verifyToken(token) as Tuser
    }

    if (isFetching || isLoading) {
        return <p>Loading ...</p>
    }

    const { releaseDate, ...defaultValues } = productInfo?.data as TproductData;


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const phoneInfo = {
            ...data
        };
        const toastId = toast.loading('Updating...')
        try {
            const res = await updatephone({ body: phoneInfo, id }).unwrap()
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
                    <Button htmlType="submit">UPDATE</Button>
                </PHForm>

            </Col>
        </Row>
    );
};

export default UpdatePhone;