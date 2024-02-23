import React, { useState } from 'react';
import { Button, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useDeletephoneMutation, useGetallphoneQuery } from '../../../redux/features/getPhone/getPhoneApi';
import { TproductData, TresponseWithouMeta } from '../../../types/program.type';
import { toast } from 'sonner';

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

const DeletePhone = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const { data: phoneData, isLoading, isFetching } = useGetallphoneQuery(undefined)
    const [deletephone] = useDeletephoneMutation()

    if (isFetching || isLoading) {
        return <p>Loading...</p>
    }
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
            responsive: ['lg'],
        },
        {
            title: 'RAM',
            key: 'ram',
            dataIndex: 'ram',
            responsive: ['md'],
        },
        {
            title: 'Storage Capacity',
            key: 'storageCapacity',
            dataIndex: 'storageCapacity',
            responsive: ['md'],
        },
        {
            title: 'Screen Size',
            key: 'screenSize',
            dataIndex: 'screenSize',
            responsive: ['lg'],
        },
        {
            title: 'Camera Quality',
            key: 'cameraQuality',
            dataIndex: 'cameraQuality',
            responsive: ['lg'],
        },
        {
            title: 'Battery Life',
            key: 'batteryLife',
            dataIndex: 'batteryLife',
            responsive: ['lg'],
        }
    ];
    const tableData: TtableData[] = [];

    (phoneData as TresponseWithouMeta<TproductData>)?.data?.forEach(({ _id, brand, model, price, quantity, operatingSystem, ram, storageCapacity, screenSize, cameraQuality, batteryLife }) => {
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
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const onDelete = async () => {
        const toastId = toast.loading('Deleting...')

        try {
            const res = await deletephone({ id: selectedRowKeys }).unwrap()
            const success = res.success

            if (!success) {
                throw new Error()
            }
            toast.success(res.message, { id: toastId })
        } catch (error: any) {
            toast.error(error?.data?.errorMessage, { id: toastId })
        }
    }

    return (
        <div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={tableData} pagination={false} />
            <Button onClick={onDelete}>Delete</Button>
        </div>
    );
};

export default DeletePhone;