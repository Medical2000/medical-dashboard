import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { UpdateWorkplace, createWorkplace, deleteWorkplace, getAllWorkplaces, getOneWorkplace } from '../../redux/action/workplace';
import { Space, Table, Input, Button, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IWorkplace } from '../../interface/workplace';
import { DeleteFilled } from '@ant-design/icons';
import { showDeleteConfirm } from '../../components/showDeleteConfirm/showDeleteConfirm';
import { showNotification } from '../../components/notification/notification';
import { resetError } from '../../redux/reducer/workplace';
import './styles.css'
import Create from './Create';
import { CustomModal } from '../../components/modal/CustomModal';
import Update from './Update';


const Workplace = () => {
    const { Search } = Input;
    const dispatch = useAppDispatch();
    const workplaceSelect = useAppSelector((state) => state.workplace);
    const [form] = Form.useForm();
    const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);
    const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
    const columns: ColumnsType<IWorkplace> = [
        {
            title: 'Nbr.',
            dataIndex: 'nbr',
            rowScope: 'row',
        },
        {
            title: 'Name',
            key: 'id',
            render: (record) => (
                <a style={{ fontWeight: 600 }} onClick={() => showModalUpdate(record.id)}>{record.name}</a>
            ),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'City',
            dataIndex: 'city',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Type',
            dataIndex: 'type',
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
        dispatch(getAllWorkplaces());
    }, [dispatch])

    useEffect(() => {
        if (workplaceSelect.success === false) {
            showNotification('error', 'Error', workplaceSelect.message);
            dispatch(resetError());
        } else if (workplaceSelect.success) {
            showNotification('success', 'Success', workplaceSelect.message);
            dispatch(resetError());
        };
    }, [workplaceSelect.success, dispatch])

    const handleDelete = (id: string) => {
        const handleDeleteWorkplace = () => {
            dispatch(deleteWorkplace(id));
        }
        showDeleteConfirm({ name: 'workplace', handleClick: handleDeleteWorkplace })
    };

    const showModalCreate = () => {
        setIsModalVisibleCreate(true);
    };

    const showModalUpdate = (id: string) => {
        dispatch(getOneWorkplace(id));

        setIsModalVisibleUpdate(true);
    };

    const handleCreate = (values: IWorkplace) => {
        dispatch(createWorkplace(values)).then((res) => {
            if (res.payload.status === 200) {
                form.resetFields();
                setIsModalVisibleCreate(false);
            };
        });
    };

    const handleUpdate = (values: IWorkplace) => {
        dispatch(UpdateWorkplace(values)).then((res) => {
            if (res.payload.status === 200) {
                // form.resetFields();
                setIsModalVisibleUpdate(false);
            };
        });
    };

    return (
        <>
            <CustomModal
                title='Create a new  workplace'
                isModalVisible={isModalVisibleCreate}
                setIsModalVisible={setIsModalVisibleCreate}
                form={form}
                footer={null}
                centered={true}
            >
                <Create
                    handleCreate={handleCreate}
                    form={form}
                />
            </CustomModal>

            <CustomModal
                title='Update a workplace'
                isModalVisible={isModalVisibleUpdate}
                setIsModalVisible={setIsModalVisibleUpdate}
                footer={null}
                centered={true}
            >
                <Update
                    handleUpdate={handleUpdate}
                    data={workplaceSelect.workplace}
                    form={form}
                />
            </CustomModal>

            <div className='headerList' >
                <Search
                    placeholder="Enter search workplace..."
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
                    Add workplace
                </Button>
            </div>
            <Table
                loading={workplaceSelect.loading}
                bordered columns={columns}
                dataSource={workplaceSelect.workplaces.map((item, index) => ({ ...item, nbr: index + 1, key: index }))} />
        </>
    )
}

export default Workplace