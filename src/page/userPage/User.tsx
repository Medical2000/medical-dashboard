import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Table, Input, Button, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteFilled } from '@ant-design/icons';
import { showDeleteConfirm } from '../../components/showDeleteConfirm/showDeleteConfirm';
import { showNotification } from '../../components/notification/notification';
import './styles.css'
import Create from './Create';
import { CustomModal } from '../../components/modal/CustomModal';
import Update from './Update';
import { UpdateUser, createUser, deleteUser, getAllUsers, getOneUser } from '../../redux/action/user';
import { IUser } from '../../interface/auth';
import dayjs from 'dayjs';
import { getAllRoles } from '../../redux/action/role';
import { resetError } from '../../redux/reducer/user';


const User = () => {
    const { Search } = Input;
    const dispatch = useAppDispatch();
    const userSelect = useAppSelector((state) => state.user);
    const roleSelect = useAppSelector((state) => state.role);
    const [form] = Form.useForm();
    const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);
    const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
    const columns: ColumnsType<IUser> = [
        {
            title: 'Nbr.',
            dataIndex: 'nbr',
            rowScope: 'row',
        },
        {
            title: 'User',
            key: 'id',
            render: (record) => (
                <a style={{ fontWeight: 600 }} onClick={() => showModalUpdate(record.id)}>{record.user_name}</a>
            ),
        },

        {
            title: 'Full Name',
            render: (record) => (
                <span >{record.firstname} {record.lastname}</span>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Authorize',
            render: (record) => (
                <span >{record.role.role_name}</span>
            ),
        },

        {
            title: 'Status',
            render: (record) => (
                <a style={{ fontWeight: 600 }} >{record.status ? "Active" : "Inactive"}</a>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (record) => (
                <DeleteFilled style={{ fontSize: '16px', color: '#555555' }} onClick={() => (handleDelete(record.id))} />
            ),
        },
    ];
    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllRoles());
    }, [dispatch])

    useEffect(() => {
        if (userSelect.success === false) {
            showNotification('error', 'Error', userSelect.message);
            dispatch(resetError());
        } else if (userSelect.success) {
            showNotification('success', 'Success', userSelect.message);
            dispatch(resetError());
        };
    }, [userSelect.success, dispatch])

    const handleDelete = (id: string) => {
        const handleDeleteUser = () => {
            dispatch(deleteUser(id));
        }
        showDeleteConfirm({ name: 'User', handleClick: handleDeleteUser })
    };

    const showModalCreate = () => {
        setIsModalVisibleCreate(true);
    };

    const showModalUpdate = (id: string) => {
        dispatch(getOneUser(id));

        setIsModalVisibleUpdate(true);
    };

    const handleCreate = (values: IUser) => {
        dispatch(createUser({ ...values })).then((res) => {
            if (res.payload.status === 200) {
                form.resetFields();
                setIsModalVisibleCreate(false);
            };
        });
    };

    const handleUpdate = (values: IUser) => {
        console.log(values)
        dispatch(UpdateUser(values)).then((res) => {
            if (res.payload.status === 200) {
                // form.resetFields();
                setIsModalVisibleUpdate(false);
            };
        });
    };

    return (
        <>
            <CustomModal
                title='Create a new  User'
                isModalVisible={isModalVisibleCreate}
                setIsModalVisible={setIsModalVisibleCreate}
                width={1200}
                footer={null}
                form={form}
                centered={true}
            >
                <Create
                    handleCreate={handleCreate}
                    role={roleSelect.roles}
                    form={form}
                />
            </CustomModal>

            <CustomModal
                title='Update a User'
                isModalVisible={isModalVisibleUpdate}
                setIsModalVisible={setIsModalVisibleUpdate}
                width={1200}
                footer={null}
                centered={true}
            >
                <Update
                    handleUpdate={handleUpdate}
                    role={roleSelect.roles}
                    data={userSelect.user}
                    form={form}
                />
            </CustomModal>

            <div className='headerList' >
                <Search
                    placeholder="Enter search user..."
                    allowClear
                    size="large"
                    style={{ width: '70%' }}

                // onSearch={onSearch}
                />
                <Button
                    type="primary"
                    size='large'
                    style={{ backgroundColor: '#1C6BA4' }}
                    onClick={showModalCreate}
                >
                    Add user
                </Button>
            </div>
            <Table
                loading={userSelect.loading}
                bordered columns={columns}
                dataSource={userSelect.users.map((item, index) => ({ ...item, nbr: index + 1, key: index }))} />
        </>
    )
}

export default User;