import { Button, Col, Flex, Space, Table, TableColumnsType } from "antd";
import { useDeleteManagerMutation, useGetAllManagerQuery, useUpdateManagerMutation } from "../../../redux/features/userManagement/userManagement.api";
import { TresponseWithouMeta, TuserInfo } from "../../../types/program.type";
import { useState } from 'react';
import { Modal } from 'antd';
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type TtableData = {
    name: string;
    email: string;
    role: string
}

const AllManager = () => {
    const { data: userData, isFetching } = useGetAllManagerQuery(undefined)

    const columns: TableColumnsType<TtableData> = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Role',
            key: 'role',
            dataIndex: 'role',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: "Action",
            key: 'x',
            render: (item) => {

                return (
                    <Space>
                        <UpdateModal id={item.key} />
                        <DeleteModal id={item.key} />
                    </Space >
                )
            },
            width: '5%'
        }
    ];
    const tableData = (userData as TresponseWithouMeta<TuserInfo>)?.data?.map(({ _id, name, email }) => ({
        key: _id,
        name,
        email,
        role: 'Manager'
    }))
    return (
        <Table loading={isFetching} columns={columns} dataSource={tableData} pagination={false} />
    );
};

export default AllManager;


const UpdateModal = ({ id }: { id: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateManager] = useUpdateManagerMutation()
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const toastId = toast.loading('Updating...')
        try {
            const res = await updateManager({ body: data, id }).unwrap()
            if (res.success) {
                toast.success(res.message, { id: toastId })
                setIsModalOpen(false);
            }
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId })
        }

    }

    return (
        <>
            <Button onClick={showModal}>
                Update
            </Button>
            <Modal title="Update Manager" open={isModalOpen} onCancel={handleCancel} footer={false}>
                <Flex justify="center" align="center" >
                    <Col span={16}>
                        <PHForm onSubmit={onSubmit} >
                            <PHInput type="text" name="name" label="Name" />
                            <Button htmlType="submit">Submit</Button>
                        </PHForm>
                    </Col>
                </Flex>
            </Modal>
        </>
    );
};
const DeleteModal = ({ id }: { id: string }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteManager] = useDeleteManagerMutation()
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async () => {

        const toastId = toast.loading('Deleting...')
        try {
            const res = await deleteManager(id).unwrap()
            if (res.success) {
                toast.success(res.message, { id: toastId })
                setIsModalOpen(false);
            }
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId })
        }

    }

    return (
        <>
            <Button onClick={showModal}>
                Delete
            </Button>
            <Modal title="Delete Manager" open={isModalOpen} onCancel={handleCancel} footer={false}>
                <Button onClick={handleDelete}>Delete</Button>
            </Modal>
        </>
    );
};