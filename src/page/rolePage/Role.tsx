import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import {  Table, Input, Button, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteFilled } from '@ant-design/icons';
import { showDeleteConfirm } from '../../components/showDeleteConfirm/showDeleteConfirm';
import { showNotification } from '../../components/notification/notification';
import './styles.css'
import Create from './Create';
import { CustomModal } from '../../components/modal/CustomModal';
import Update from './Update';
import { IRole } from '../../interface/auth';
import { UpdateRole, createRole, deleteRole, getAllRoles, getOneRole } from '../../redux/action/role';
import { resetError } from '../../redux/reducer/role';


const Role = () => {
    const { Search } = Input;
    const dispatch = useAppDispatch();
    const roleSelect = useAppSelector((state) => state.role);
    const [form] = Form.useForm();
    const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);
    const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
    const columns: ColumnsType<IRole> = [
        {
            title: 'Nbr.',
            dataIndex: 'nbr',
            rowScope: 'row',
        },
        {
            title: 'Role Name',
            key: 'id',
            render: (record) => (
                <a style={{ fontWeight: 600 }} onClick={() => showModalUpdate(record.id)}>{record.role_name}</a>
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
        dispatch(getAllRoles());
    }, [dispatch])

    useEffect(() => {
        console.log(roleSelect)
        if (roleSelect.success === false) {
            showNotification('error', 'Error', roleSelect.message);
            dispatch(resetError());
        } else if (roleSelect.success) {
            showNotification('success', 'Success', roleSelect.message);
            dispatch(resetError());
        };
    }, [roleSelect.success,dispatch]);

    const handleDelete = (id: string) => {
        const handleDeleteRole = () => {
            dispatch(deleteRole(id));
        }
        showDeleteConfirm({ name: 'Role', handleClick: handleDeleteRole })
    };

    const showModalCreate = () => {
        setIsModalVisibleCreate(true);
    };

    const showModalUpdate = (id: string) => {
        dispatch(getOneRole(id));

        setIsModalVisibleUpdate(true);
    };

    const handleCreate = (values: IRole) => {
        dispatch(createRole(values)).then((res) => {
            if (res.payload.status === 200) {
                form.resetFields();
                setIsModalVisibleCreate(false);
            };
        });
    };

    const handleUpdate = (values: IRole) => {
        dispatch(UpdateRole(values)).then((res) => {
            if (res.payload.status === 200) {
                // form.resetFields();
                setIsModalVisibleUpdate(false);
            };
        });
    };

    return (
        <>
            <CustomModal
                title='Create a new  Role'
                isModalVisible={isModalVisibleCreate}
                setIsModalVisible={setIsModalVisibleCreate}
                form={form}
                width={800}
            >
                <Create
                    handleCreate={handleCreate}
                    form={form}
                />
            </CustomModal>

            <CustomModal
                title='Update a Role'
                isModalVisible={isModalVisibleUpdate}
                setIsModalVisible={setIsModalVisibleUpdate}
                width={800}
            >
                <Update
                    handleUpdate={handleUpdate}
                    data={roleSelect.role}
                    form={form}
                />
            </CustomModal>

            <div className='headerList' >
                <Search
                    placeholder="Enter search Role..."
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
                    Add Role
                </Button>
            </div>
            
            <Table
                loading={roleSelect.loading}
                bordered columns={columns}
                dataSource={roleSelect.roles.map((item, index) => ({ ...item, nbr: index + 1, key: index }))} />
        </>
    )
}

export default Role;