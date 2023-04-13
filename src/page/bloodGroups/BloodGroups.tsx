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
import { resetError } from '../../redux/reducer/bloodGroup';
import { IBloodGroup } from '../../interface/patient';
import { UpdateBloodGroup, createBloodGroup, deleteBloodGroup, getAllBloodGroups, getOneBloodGroup } from '../../redux/action/bloodGroup';


const BloodGroups = () => {
    const { Search } = Input;
    const dispatch = useAppDispatch();
    const bloodGroupSelect = useAppSelector((state) => state.bloodGroup);
    const [form] = Form.useForm();
    const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);
    const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
    const columns: ColumnsType<IBloodGroup> = [
        {
            title: 'Nbr.',
            dataIndex: 'nbr',
            rowScope: 'row',
        },
        {
            title: 'Blood Name',
            key: 'id',
            render: (record) => (
                <a style={{ fontWeight: 600 }} onClick={() => showModalUpdate(record.id)}>{record.blood_name}</a>
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
        dispatch(getAllBloodGroups());
    }, [dispatch])

    useEffect(() => {
        console.log(bloodGroupSelect)
        if (bloodGroupSelect.success === false) {
            showNotification('error', 'Error', bloodGroupSelect.message);
            dispatch(resetError());
        } else if (bloodGroupSelect.success) {
            showNotification('success', 'Success', bloodGroupSelect.message);
            dispatch(resetError());
        };
    }, [bloodGroupSelect.success, dispatch]);

    const handleDelete = (id: string) => {
        const handleDeleteBloodGroup = () => {
            dispatch(deleteBloodGroup(id));
        }
        showDeleteConfirm({ name: 'BloodGroup', handleClick: handleDeleteBloodGroup })
    };

    const showModalCreate = () => {
        setIsModalVisibleCreate(true);
    };

    const showModalUpdate = (id: string) => {
        dispatch(getOneBloodGroup(id));

        setIsModalVisibleUpdate(true);
    };

    const handleCreate = (values: IBloodGroup) => {
        dispatch(createBloodGroup(values)).then((res) => {
            if (res.payload.status === 200) {
                form.resetFields();
                setIsModalVisibleCreate(false);
            };
        });
    };

    const handleUpdate = (values: IBloodGroup) => {
        dispatch(UpdateBloodGroup(values)).then((res) => {
            if (res.payload.status === 200) {
                // form.resetFields();
                setIsModalVisibleUpdate(false);
            };
        });
    };

    return (
        <>
            <CustomModal
                title='Create a new  BloodGroup'
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
                title='Update a BloodGroup'
                isModalVisible={isModalVisibleUpdate}
                setIsModalVisible={setIsModalVisibleUpdate}
                width={800}
            >
                <Update
                    handleUpdate={handleUpdate}
                    data={bloodGroupSelect.bloodGroup}
                    form={form}
                />
            </CustomModal>

            <div className='headerList' >
                <Search
                    placeholder="Enter search BloodGroup..."
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
                    Add BloodGroup
                </Button>
            </div>

            <Table
                loading={bloodGroupSelect.loading}
                bordered columns={columns}
                dataSource={bloodGroupSelect.bloodGroups.map((item, index) => ({ ...item, nbr: index + 1, key: index }))} />
        </>
    )
}

export default BloodGroups;