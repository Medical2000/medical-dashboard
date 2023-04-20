import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Table, Input, Button, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteFilled } from '@ant-design/icons';
import { showDeleteConfirm } from '../../components/showDeleteConfirm/showDeleteConfirm';
import { showNotification } from '../../components/notification/notification';
import './styles.css'
import Create from './Create/General';
import { CustomModal } from '../../components/modal/CustomModal';
import Update from './Update';
import { resetError } from '../../redux/reducer/user';
import { ICreateDoctor, IDoctor } from '../../interface/doctor';
import { UpdateDoctor, createDoctor, deleteDoctor, getAllDoctors, getOneDoctor } from '../../redux/action/doctor';
import { Creates } from './Create/Create';
import { getAllWorkplaces } from '../../redux/action/workplace';
import { getAllDegrees } from '../../redux/action/degree';
// import { Creates } from './create/Create';


const Doctor = () => {
    const { Search } = Input;
    const dispatch = useAppDispatch();
    const DoctorSelect = useAppSelector((state) => state.doctor);
    const [form] = Form.useForm();
    const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);
    const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
    const columns: ColumnsType<IDoctor> = [
        {
            title: 'Nbr.',
            dataIndex: 'nbr',
            rowScope: 'row',
        },
        {
            title: 'Doctor',
            key: 'id',
            render: (record) => (
                <a style={{ fontWeight: 600 }} onClick={() => showModalUpdate(record.id)}><span >{record.user.firstname} {record.user. lastname}</span></a>
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
        dispatch(getAllDoctors());
        dispatch(getAllWorkplaces());
        dispatch(getAllDegrees());
    }, [dispatch])

    useEffect(() => {
        if (DoctorSelect.success === false) {
            showNotification('error', 'Error', DoctorSelect.message);
            dispatch(resetError());
        } else if (DoctorSelect.success) {
            showNotification('success', 'Success', DoctorSelect.message);
            dispatch(resetError());
        };
    }, [DoctorSelect.success, dispatch])

    const handleDelete = (id: string) => {
        const handleDeleteDoctor = () => {
            dispatch(deleteDoctor(id));
        }
        showDeleteConfirm({ name: 'Doctor', handleClick: handleDeleteDoctor })
    };

    const showModalCreate = () => {
        setIsModalVisibleCreate(true);
    };

    const showModalUpdate = (id: string) => {
        dispatch(getOneDoctor(id));

        setIsModalVisibleUpdate(true);
    };



    const handleUpdate = (values: IDoctor) => {
        console.log(values)
        dispatch(UpdateDoctor(values)).then((res) => {
            if (res.payload.status === 200) {
                // form.resetFields();
                setIsModalVisibleUpdate(false);
            };
        });
    };
    const onFinish = (values: ICreateDoctor) => {
        dispatch(createDoctor(values)).then((res) => {
            if (res.payload.status === 200) {   
                form.resetFields();
                setIsModalVisibleCreate(false);
            };
        });
    };

    const handleCreate = () => {
        form.validateFields().then((values) => {
            onFinish(values);
        }).catch((errorInfo) => {
            console.log('Invalid form values:', errorInfo);
        });
    };


    return (
        <>
            <CustomModal
                title='Create a new  Doctor'
                isModalVisible={isModalVisibleCreate}
                setIsModalVisible={setIsModalVisibleCreate}
                width={1200}
                form={form}
                centered={true}
                handleSave={handleCreate}
            >
                <Creates
                    form={form}
                    setIsModalVisibleCreate={setIsModalVisibleCreate}
                />
            </CustomModal>

            <CustomModal
                title='Update a Doctor'
                isModalVisible={isModalVisibleUpdate}
                setIsModalVisible={setIsModalVisibleUpdate}
                width={1200}
            >
                <Update
                    handleUpdate={handleUpdate}
                    data={DoctorSelect.doctor}
                    form={form}

                />
            </CustomModal>

            <div className='headerList' >
                <Search
                    placeholder="Enter search Doctor..."
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
                    Add Doctor
                </Button>
            </div>
            <Table
                loading={DoctorSelect.loading}
                bordered columns={columns}
                dataSource={DoctorSelect.doctors.map((item, index) => ({ ...item, nbr: index + 1, key: index }))} />
        </>
    )
}

export default Doctor;