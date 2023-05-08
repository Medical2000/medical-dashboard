
import React, { useEffect, useState } from 'react';
import { getAllAppointments, getOneAppointment } from '../../redux/action/appointment';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Table, { ColumnsType } from 'antd/es/table';
import { IAppointment } from '../../interface/appointment';
import dayjs from 'dayjs';
import { Tag } from 'antd';
import { CustomModal } from '../../components/modal/CustomModal';
import { Description } from './Description';

const Appointment = () => {
    const dispatch = useAppDispatch();
    const appointmentSelect = useAppSelector((state) => state.appointment)
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        dispatch(getAllAppointments());
    }, [dispatch])

    const showModal = (id: string) => {
        dispatch(getOneAppointment(id));
        setIsModalVisible(true);
    };


    const columns: ColumnsType<IAppointment> = [
        {
            title: 'STT',
            dataIndex: 'nbr',
            rowScope: 'row',
        },
        {
            title: 'ID',
            key: 'id',
            render: (record) => (
                <a style={{ fontWeight: 600 }} onClick={() => showModal(record.id)}>AP{record.id.slice(0, 8)}</a>
            ),
        },
        {
            title: 'Bệnh nhân',
            render: (text, record) => `${record?.user?.firstname} ${record?.user?.lastname}`
        },
        {
            title: 'Bác sĩ',
            render: (text, record) => `${record?.doctorUser?.firstname} ${record?.user?.lastname}`
        },
        {
            title: 'Gi chú',
            dataIndex: 'notes'
        },
        {
            title: 'Giờ',
            dataIndex: 'time'
        },
        {
            title: 'Ngày',
            render: (text, record) => dayjs(record?.date).format("DD-MM-YYYY")
        },
        {
            title: 'Trạng thái',
            render: (record) => (
                <Tag color={record.status === "COMING" ? "green"
                    : record.status === "COMPLETE" ? "#0073B7"
                        : "default"}
                    style={{ fontWeight: 600 }}
                    onClick={() => { }}
                >
                    {record.status}
                </Tag>
            ),
        },
    ];

    return (
        <>
            <CustomModal
                title='Chi tiết lịch hẹn'
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                footer={null}
            >
                <Description
                    setIsModalVisible={setIsModalVisible}
                    data={appointmentSelect.appointment}
                />
            </CustomModal>
            <Table
                loading={appointmentSelect.loading}
                bordered columns={columns}
                dataSource={appointmentSelect.appointments.map((item, index) => ({ ...item, nbr: index + 1, key: index }))} />
        </>
    )
}

export default Appointment;