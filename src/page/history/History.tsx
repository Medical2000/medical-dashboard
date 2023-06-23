
import React, { useEffect, useState } from 'react';
import { getAllAppointments, getOneAppointment } from '../../redux/action/appointment';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Table, { ColumnsType } from 'antd/es/table';
import { IAppointment } from '../../interface/appointment';
import dayjs from 'dayjs';
import { Tag } from 'antd';
import { CustomModal } from '../../components/modal/CustomModal';
import { Description } from './Description';
import { Rate } from 'antd';

const History = () => {
    const dispatch = useAppDispatch();
    const appointmentSelect = useAppSelector((state) => state.appointment);
    const data = appointmentSelect && appointmentSelect.appointments.filter((e) => e.status == "COMPLETED");
    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    //   const formmatSater = item.videoCall && dayjs(item.videoCall.start_time)
    //     .locale('vi')
    //     .format('dddd, DD-MM-YYYY')
    //     .replace(/^\w+/, str => capitalize(str));
    console.log(data);

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
            render: (text, record) => record?.videoCall.roomSid.slice(0, 8)
        },

        {
            title: 'Bác sĩ',
            render: (text, record) => `${record?.doctorUser?.firstname} ${record?.doctorUser?.lastname}`
        },
        {
            title: 'Bệnh nhân',
            render: (text, record) => `${record?.user?.firstname} ${record?.user?.lastname}`
        },
        {
            title: 'Thời gian bắt đầu',
            render: (text, record) => data && dayjs(record.videoCall.start_time).format("h:mm DD-MM-YYYY")
        },
        {
            title: 'Thời gian kết thúc',
            render: (text, record) => data && dayjs(record.videoCall.end_time).format("h:mm DD-MM-YYYY")
        },
        {
            title: 'Thời gian',
            render: (text, record) => data && `${record.videoCall.duration} giây`
        },
        {
            title: 'Đánh giá',
            render: (record) => (
                <Rate value={record.videoCall.rating} />
            ),
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
                dataSource={data.map((item, index) => ({ ...item, nbr: index + 1, key: index }))} />
        </>
    )
}

export default History;