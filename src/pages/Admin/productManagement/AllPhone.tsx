import { Button, Col, Input, Modal, Pagination, Row, Slider, Space, Table, TableColumnsType, TableProps } from "antd";
import { Link } from "react-router-dom";
import { useDeletephoneMutation, useGetphoneQuery } from "../../../redux/features/getPhone/getPhoneApi";
import { Tfilter, TproductData, Tresponse } from "../../../types/program.type";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoDuplicate } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import { batteryLifeFilterOptions, cameraQualityFilterOptions, phoneBrandFilterOptions, ramFilterOptions, romFilterOptions, screenSizeFilterOptions } from "../../../const";
import { useState } from "react";
import { toast } from "sonner";

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
                    <Link to={`/superAdmin/update-phone/${item.key}`}>
                        <Button><CiEdit /></Button>
                    </Link>
                    <DeleteModal productId={item.key} />
                    <Link to={`/superAdmin/create-variant/${item.key}`}>
                        <Button><IoDuplicate /></Button>
                    </Link>
                    <Link to={`/superAdmin/product-update/${item.key}`}>
                        <Button><FaCartArrowDown /></Button>
                    </Link>
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

const DeleteModal = ({ productId }: { productId: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deletephone] = useDeletephoneMutation()

    const showModal = () => {
        setIsModalOpen(true);
    };
    const query = {
        id: [productId]
    }

    const handleOk = async () => {
        const toastId = toast.loading('Deleting...')

        try {
            const res = await deletephone(query).unwrap()
            const success = res.success

            if (!success) {
                throw new Error()
            }
            toast.success(res.message, { id: toastId })
        } catch (error: any) {
            toast.error(error?.data?.errorMessage, { id: toastId })
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={showModal}>
                <MdDelete />
            </Button>
            <Modal title="Delete Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>You want to Delete the Product??</p>
            </Modal>
        </>
    );
};