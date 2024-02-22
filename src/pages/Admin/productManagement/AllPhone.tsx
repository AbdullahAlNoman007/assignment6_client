import { Button, Space, Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import { useGetallphoneQuery } from "../../../redux/features/getPhone/getPhoneApi";

type TtableData = {
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
    const { data: phoneData } = useGetallphoneQuery(undefined)
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
                        <Button>Update</Button>
                    </Link>
                    <Link to={`/admin/product-update/${item.key}`}>
                        <Button>Delete</Button>
                    </Link>
                    <Link to={`/admin/product-update/${item.key}`}>
                        <Button>Create Variant</Button>
                    </Link>
                    <Link to={`/admin/product-update/${item.key}`}>
                        <Button>Buy</Button>
                    </Link>
                </Space>
            ),
            width: '1%'
        }
    ];
    return (
        <>
            <Table loading={isFetching} columns={columns} dataSource={tableData} pagination={false} />
        </>
    );
};

export default AllPhone;