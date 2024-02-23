import { Button, Col, Input, Modal, Pagination, Row, Slider, Space, Table, TableColumnsType, TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { batteryLifeFilterOptions, cameraQualityFilterOptions, phoneBrandFilterOptions, ramFilterOptions, romFilterOptions, screenSizeFilterOptions } from "../../const";
import { Tfilter, TproductData, Tresponse } from "../../types/program.type";
import { useGetphoneQuery } from "../../redux/features/getPhone/getPhoneApi";
import { useBuyphoneMutation } from "../../redux/features/getPhone/updatePhoneApi";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";

type TtableData = {
    key: string;
    _id: string;
    brand: string;
    model: string;
    price: number;
    quantity: number;
    operatingSystem: 'andriod' | 'iOS',
    ram: string,
    storageCapacity: string;
    screenSize: string;
    cameraQuality: string;
    batteryLife: string;
}

const AllPhone = () => {
    let queryParams: Tfilter[] = []
    const [params, setParams] = useState<Tfilter[]>([])

    const [page, setPage] = useState(1)
    const [range, setrange] = useState('0-1500')
    const { data: phoneData, isFetching } = useGetphoneQuery([
        { name: 'price', value: range },
        { name: 'page', value: page },
        { name: 'limit', value: 5 },
        ...params
    ])
    const columns: TableColumnsType<TtableData> = [
        {
            title: 'Brand',
            key: 'brand',
            dataIndex: 'brand',
            filters: phoneBrandFilterOptions
        },
        {
            title: 'Model',
            key: 'model',
            dataIndex: 'model',
            responsive: ['lg'],
        },
        {
            title: 'Price',
            key: 'price',
            dataIndex: 'price',
        },
        {
            title: 'Quantity',
            key: 'quantity',
            dataIndex: 'quantity',
            responsive: ['md'],
        },
        {
            title: 'Operating System',
            key: 'operatingSystem',
            dataIndex: 'operatingSystem',
            filters: [
                {
                    text: 'Andriod',
                    value: 'andriod',
                },
                {
                    text: 'iOS',
                    value: 'iOS',
                },
            ],
            responsive: ['lg'],
        },
        {
            title: 'RAM',
            key: 'ram',
            dataIndex: 'ram',
            filters: ramFilterOptions,
            responsive: ['md'],
        },
        {
            title: 'Storage Capacity',
            key: 'storageCapacity',
            dataIndex: 'storageCapacity',
            filters: romFilterOptions,
            responsive: ['md'],
        },
        {
            title: 'Screen Size',
            key: 'screenSize',
            dataIndex: 'screenSize',
            filters: screenSizeFilterOptions,
            responsive: ['lg'],
        },
        {
            title: 'Camera Quality',
            key: 'cameraQuality',
            dataIndex: 'cameraQuality',
            filters: cameraQualityFilterOptions,
            responsive: ['lg'],
        },
        {
            title: 'Battery Life',
            key: 'batteryLife',
            dataIndex: 'batteryLife',
            filters: batteryLifeFilterOptions,
            responsive: ['lg'],
        },
        {
            title: "Action",
            key: 'action',
            render: (item) => (
                <Space>
                    <SellModal productId={item.key} />
                </Space>
            ),
            width: '1%'
        }
    ];

    const total = (phoneData as Tresponse<TproductData>)?.data.meta.total;
    const tableData: TtableData[] = [];

    (phoneData as Tresponse<TproductData>)?.data?.result?.forEach(({ _id, brand, model, price, quantity, operatingSystem, ram, storageCapacity, screenSize, cameraQuality, batteryLife }) => {
        if (quantity > 0) {
            tableData.push({
                key: _id,
                _id,
                brand,
                model,
                price,
                quantity,
                operatingSystem,
                ram,
                storageCapacity,
                screenSize,
                cameraQuality,
                batteryLife
            });
        }
    });

    const onChange: TableProps<TtableData>['onChange'] = (_pagination, filters, _sorter, extra) => {
        if (extra.action === 'filter') {

            filters.operatingSystem?.forEach((item) => queryParams.push({ name: 'operatingSystem', value: item }))
            filters.ram?.forEach((item) => queryParams.push({ name: 'ram', value: item }))
            filters.storageCapacity?.forEach((item) => queryParams.push({ name: 'storageCapacity', value: item }))
            filters.screenSize?.forEach((item) => queryParams.push({ name: 'screenSize', value: item }))
            filters.cameraQuality?.forEach((item) => queryParams.push({ name: 'cameraQuality', value: item }))
            filters.batteryLife?.forEach((item) => queryParams.push({ name: 'batteryLife', value: item }))
            filters.brand?.forEach((item) => queryParams.push({ name: 'brand', value: item }))
            setParams(queryParams)
        }
    };
    const onRange = (newValue: number[]) => {
        setrange(`${newValue[0]}-${newValue[1]}`)
    };
    const onSearch = (searchQuery: string) => {
        const newParams: Tfilter[] = [...params];
        const searchTerm: Tfilter = {
            name: 'searchTerm',
            value: searchQuery.trim()
        };
        if (searchQuery) {
            const existingSearchIndex = newParams.findIndex(param => param.name === 'searchTerm');
            if (existingSearchIndex !== -1) {
                newParams.splice(existingSearchIndex, 1);
            }
            newParams.push(searchTerm);
        } else {
            const existingSearchIndex = newParams.findIndex(param => param.name === 'searchTerm');
            if (existingSearchIndex !== -1) {
                newParams.splice(existingSearchIndex, 1);
            }
        }
        setParams(newParams);
    };


    return (
        <>
            <Row gutter={10} style={{ marginBottom: '10px' }}>
                <Col span={18}>
                    <div>
                        <h4>Price Range:</h4>
                        <Slider range min={0} max={2000} step={50} defaultValue={[150, 550]} onChange={onRange} />
                    </div>

                </Col>
                <Col span={5}>
                    <div>
                        <h4>Search:</h4>
                        <Input type="text" placeholder="Search" onChange={(e) => onSearch(e.target.value)} />
                    </div>
                </Col>
            </Row>
            <Table loading={isFetching} columns={columns} dataSource={tableData} onChange={onChange} pagination={false} />
            <Pagination pageSize={5} total={total} onChange={(value) => setPage(value)} />
        </>
    );
};

export default AllPhone;

const SellModal = ({ productId }: { productId: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buyphone] = useBuyphoneMutation();
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleOk = async () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const saleInfo = {
            buyerName: data.buyerName,
            quantity: Number(data.quantity),
            saleDate: data.saleDate
        }

        const toastId = toast.loading('Buying...')

        try {
            const res = await buyphone({ id: productId, body: saleInfo }).unwrap()
            const success = res.success

            if (!success) {
                throw new Error()
            }
            toast.success(res.message, { id: toastId })
        } catch (error: any) {
            toast.error(error?.data?.errorMessage, { id: toastId })
        }
        setIsModalOpen(false);
        navigate('/seller/invoice', { state: saleInfo })


    }

    return (
        <>
            <Button onClick={showModal}>
                <FaCartArrowDown />
            </Button>
            <Modal title="Sale Details" footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Row justify='center' align='middle'>
                    <Col span={20}>
                        <PHForm onSubmit={onSubmit}>
                            <PHInput type="text" name="buyerName" label="Buyer Name" placeholder="Buyer Name" />
                            <PHInput type="number" name="quantity" label="Quantity" placeholder="Quantity" />
                            <PHInput type="text" name="saleDate" label="Sale Date" placeholder="Date(YYYY-MM-DD)" />
                            <Button htmlType="submit">Buy</Button>
                        </PHForm>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};