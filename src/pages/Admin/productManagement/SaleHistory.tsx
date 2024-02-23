import { Select, Table, TableColumnsType } from "antd";
import { useSalehistoryQuery } from "../../../redux/features/getPhone/updatePhoneApi";
import { TresponseWithouMeta, TsaleData } from "../../../types/program.type";
import moment from "moment";
import { useState } from "react";

type TtableData = {
    key: string,
    _id: string,
    quantity: number,
    buyerName: string,
    saleDate: string
}

const SaleHistory = () => {
    const [params, setParams] = useState<string | undefined>(undefined)
    const { data: saleData, isFetching } = useSalehistoryQuery(params)

    const columns: TableColumnsType<TtableData> = [
        {
            title: 'Buyer Name',
            key: 'buyerName',
            dataIndex: 'buyerName',
        },
        {
            title: 'Quantity',
            key: 'quantity',
            dataIndex: 'quantity'
        },
        {
            title: 'Sale Date',
            key: 'saleDate',
            dataIndex: 'saleDate',
        }
    ];
    const tableData: TtableData[] = [];

    (saleData as TresponseWithouMeta<TsaleData>)?.data?.forEach(({ _id, quantity, saleDate, buyerName }) => {
        if (quantity > 0) {
            tableData.push({
                key: _id,
                _id,
                buyerName,
                quantity,
                saleDate: moment(saleDate).format("YYYY-MM-DD")
            });
        }
    });

    const handleChange = (value: string) => {
        if (value === 'none') {
            setParams(undefined)
        }
        else {
            setParams(`duration=${value}`)
        }

    };

    return (
        <>
            <Select
                defaultValue="none"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                    { value: 'none', label: 'None' },
                    { value: 'yearly', label: 'Yearly' },
                    { value: 'monthly', label: 'Monthly' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'daily', label: 'Daily' },

                ]}
            />
            <Table loading={isFetching} columns={columns} dataSource={tableData} pagination={false} />
        </>
    );
};

export default SaleHistory;