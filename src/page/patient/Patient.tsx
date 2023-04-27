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
import { Creates } from './Create/Create';
import { getAllWorkplaces } from '../../redux/action/workplace';
import { getAllDegrees } from '../../redux/action/degree';
import { ICreatePatient, IPatient } from '../../interface/patient';
import { UpdatePatient, createPatient, deletePatient, getAllPatients, getOnePatient } from '../../redux/action/patient';
import { resetError } from '../../redux/reducer/patient';



const Patient = () => {
    const { Search } = Input;
    const dispatch = useAppDispatch();
    const PatientSelect = useAppSelector((state) => state.patient);
    const [form] = Form.useForm();
    const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);
    const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
    const [id, setId] = useState('');
    const columns: ColumnsType<IPatient> = [
        {
            title: 'STT',
            dataIndex: 'nbr',
            rowScope: 'row',
        },
        {
            title: 'Bệnh nhân',
            key: 'id',
            render: (record) => (
                <a style={{ fontWeight: 600 }} onClick={() => showModalUpdate(record.id)}><span >{record.user.firstname} {record.user.lastname}</span></a>
            ),
        },
        // {
        //     title: 'Chuyên ngành',
        //     dataIndex: 'specialty'
        // },
        {
            title: 'Số BHYT',
            dataIndex: 'health_insurance_number'
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
        dispatch(getAllPatients());
        dispatch(getAllWorkplaces());
        dispatch(getAllDegrees());
    }, [dispatch])

    useEffect(() => {
        if (PatientSelect.success === false) {
            showNotification('error', 'Error', PatientSelect.message);
            dispatch(resetError());
        } else if (PatientSelect.success) {
            showNotification('success', 'Success', PatientSelect.message);
            dispatch(resetError());
        };
    }, [PatientSelect.success, dispatch])

    const handleDelete = (id: string) => {
        const handleDeletePatient = () => {
            dispatch(deletePatient(id));
        }
        showDeleteConfirm({ name: 'Patient', handleClick: handleDeletePatient })
    };

    const showModalCreate = () => {
        setIsModalVisibleCreate(true);
    };

    const showModalUpdate = (id: string) => {
        dispatch(getOnePatient(id));
        setId(id)
        setIsModalVisibleUpdate(true);
    };

    const onUpdate = (values: ICreatePatient) => {
        // console.log('values',values)
        dispatch(UpdatePatient({ ...values, id })).then((res) => {
            if (res.payload.status === 200) {
                form.resetFields();
                dispatch(getAllPatients());  
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
    const onFinish = (values: ICreatePatient) => {
        dispatch(createPatient(values)).then((res) => {
            if (res.payload.status === 200) {
                form.resetFields();
                dispatch(getAllPatients());
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
                title='Tạo bệnh nhận mới'
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
                title='Cập nhật Bệnh nhân'
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
                    data={PatientSelect.patient}
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
                    Tạo mới
                </Button>
            </div>
            <Table
                scroll={{ x: 1000 }}
                loading={PatientSelect.loading}
                bordered columns={columns}
                dataSource={PatientSelect.patients.map((item, index) => ({ ...item, nbr: index + 1, key: index }))} />
        </>
    )
}

export default Patient;