import { Button, Slider, Space, Table, TableColumnsType, TableProps } from "antd";
import { Link } from "react-router-dom";
import { useGetphoneQuery } from "../../../redux/features/getPhone/getPhoneApi";
import { Tfilter, TproductData, Tresponse } from "../../../types/program.type";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoDuplicate } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import { batteryLifeFilterOptions, cameraQualityFilterOptions, phoneBrandFilterOptions, priceFilterOptions, ramFilterOptions, romFilterOptions, screenSizeFilterOptions } from "../../../const";
import { useState } from "react";

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
    const [params, setParams] = useState<Tfilter[]>([])
    const [page, setPage] = useState(1)
    const [range, setrange] = useState('')
    const { data: phoneData, isFetching } = useGetphoneQuery([
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
        },
        {
            title: 'Price',
            key: 'price',
            dataIndex: 'price',
            filters: priceFilterOptions
        },
        {
            title: 'Quantity',
            key: 'quantity',
            dataIndex: 'quantity',
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
            ]
        },
        {
            title: 'RAM',
            key: 'ram',
            dataIndex: 'ram',
            filters: ramFilterOptions
        },
        {
            title: 'Storage Capacity',
            key: 'storageCapacity',
            dataIndex: 'storageCapacity',
            filters: romFilterOptions
        },
        {
            title: 'Screen Size',
            key: 'screenSize',
            dataIndex: 'screenSize',
            filters: screenSizeFilterOptions
        },
        {
            title: 'Camera Quality',
            key: 'cameraQuality',
            dataIndex: 'cameraQuality',
            filters: cameraQualityFilterOptions
        },
        {
            title: 'Battery Life',
            key: 'batteryLife',
            dataIndex: 'batteryLife',
            filters: batteryLifeFilterOptions
        },
        {
            title: "Action",
            key: 'action',
            render: (item) => (
                <Space>
                    <Link to={`/admin/product-update/${item.key}`}>
                        <Button><CiEdit /></Button>
                    </Link>
                    <Link to={`/admin/product-update/${item.key}`}>
                        <Button><MdDelete /></Button>
                    </Link>
                    <Link to={`/admin/product-update/${item.key}`}>
                        <Button><IoDuplicate /></Button>
                    </Link>
                    <Link to={`/admin/product-update/${item.key}`}>
                        <Button><FaCartArrowDown /></Button>
                    </Link>
                </Space>
            ),
            width: '1%'
        }
    ];

    const tableData: TtableData[] = [];

    (phoneData as Tresponse<TproductData>)?.data?.forEach(({ _id, brand, model, price, quantity, operatingSystem, ram, storageCapacity, screenSize, cameraQuality, batteryLife }) => {
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
        console.log(filters);

        if (extra.action === 'filter') {
            const queryParams: Tfilter[] = []
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

    return (
        <>
            <Slider range min={0} max={2000} defaultValue={[150, 550]} onChange={onRange} />
            <Table loading={isFetching} columns={columns} dataSource={tableData} onChange={onChange} pagination={false} />
        </>
    );
};

export default AllPhone;