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
import { Update } from './Update';
import { ICreateDoctor, IDoctor } from '../../interface/doctor';
import { UpdateDoctor, createDoctor, deleteDoctor, getAllDoctors, getOneDoctor } from '../../redux/action/doctor';
import { Creates } from './Create/Create';
import { getAllWorkplaces } from '../../redux/action/workplace';
import { getAllDegrees } from '../../redux/action/degree';
import { resetError } from '../../redux/reducer/doctor';
// import { Creates } from './create/Create';


const Doctor = () => {
    const { Search } = Input;
    const dispatch = useAppDispatch();
    const DoctorSelect = useAppSelector((state) => state.doctor);
    const [form] = Form.useForm();
    const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);
    const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
    const [id, setId] = useState('');
    const columns: ColumnsType<IDoctor> = [
        {
            title: 'STT',
            dataIndex: 'nbr',
            rowScope: 'row',
        },
        {
            title: 'Bác sĩ',
            key: 'id',
            render: (record) => (
                <a style={{ fontWeight: 600 }} onClick={() => showModalUpdate(record.id)}><span >{record.user.firstname} {record.user.lastname}</span></a>
            ),
        },
        {
            title: 'Chuyên ngành',
            dataIndex: 'specialty'
        },
        {
            title: 'Số giấy phép',
            dataIndex: 'license_number'
        },

        {
            title: 'Email',
            render: (text, record) => record?.user?.email
        },
        {
            title: 'Điện thoại',
            render: (text, record) => record?.user?.phone
        },


        {
            title: 'Trạng thái',
            render: (record) => (
                <a style={{ fontWeight: 600 }} >{record.user.status ? "Active" : "Inactive"}</a>
            ),
        },
        {
            title: 'Hành động',
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
        setId(id)
        setIsModalVisibleUpdate(true);
    };

    const onUpdate = (values: ICreateDoctor) => {
        // console.log('values',values)
        dispatch(UpdateDoctor({ ...values, id })).then((res) => {
            if (res.payload.status === 200) {
                form.resetFields();
                dispatch(getAllDoctors());  
                setIsModalVisibleUpdate(false);
            };
        });
    };

    const handleUpdate = () => {
        form.validateFields().then((values) => {
            onUpdate(values);
        }).catch((errorInfo) => {
            console.log('Invalid form values:', errorInfo);
        });
    };
    const onFinish = (values: ICreateDoctor) => {
        dispatch(createDoctor(values)).then((res) => {
            if (res.payload.status === 200) {
                form.resetFields();
                dispatch(getAllDoctors());
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
                title='Tạo bác sĩ mới'
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
                title='Cập nhật bác sĩ'
                isModalVisible={isModalVisibleUpdate}
                setIsModalVisible={setIsModalVisibleUpdate}
                form={form}
                width={1200}
                centered={true}
                handleSave={handleUpdate}
            >
                <Update
                    form={form}
                    setIsModalVisibleCreate={setIsModalVisibleCreate}
                    data={DoctorSelect.doctor}
                />
            </CustomModal>

            <div className='headerList' >
                <Search
                    placeholder="Tìm kiếm bác sĩ..."
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
                    Tạo bác sĩ
                </Button>
            </div>
            <Table
                scroll={{ x: 1000 }}
                loading={DoctorSelect.loading}
                bordered columns={columns}
                dataSource={DoctorSelect.doctors.map((item, index) => ({ ...item, nbr: index + 1, key: index }))} />
        </>
    )
}

export default Doctor;