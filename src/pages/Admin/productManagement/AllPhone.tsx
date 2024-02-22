import { Button, Space, Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import { useGetallphoneQuery } from "../../../redux/features/getPhone/getPhoneApi";
import { TproductData, Tresponse } from "../../../types/program.type";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoDuplicate } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";

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
    const { data: phoneData, isFetching } = useGetallphoneQuery(undefined)
    const columns: TableColumnsType<TtableData> = [
        {
            title: 'Brand',
            key: 'brand',
            dataIndex: 'brand',
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
                    value: 'andrioid',
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
        },
        {
            title: 'Storage Capacity',
            key: 'storageCapacity',
            dataIndex: 'storageCapacity',
        },
        {
            title: 'Screen Size',
            key: 'screenSize',
            dataIndex: 'screenSize',
        },
        {
            title: 'Camera Quality',
            key: 'cameraQuality',
            dataIndex: 'cameraQuality',
        },
        {
            title: 'Battery Life',
            key: 'batteryLife',
            dataIndex: 'batteryLife',
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

    return (
        <>
            <Table loading={isFetching} columns={columns} dataSource={tableData} pagination={false} />
        </>
    );
};

export default AllPhone;