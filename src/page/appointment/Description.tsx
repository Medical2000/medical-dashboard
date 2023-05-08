import React from 'react';
import { Descriptions, Tag } from 'antd';
import { IAppointment } from '../../interface/appointment';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

export const Description = ({ setIsModalVisible, data }: { setIsModalVisible: (value: boolean) => void, data: IAppointment }) => {
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const formmatDate = dayjs(data.date)
    .locale('vi')
    .format('dddd, DD-MM-YYYY')
    .replace(/^\w+/, str => capitalize(str));
  return (
    <Descriptions title={`AP${data.id.slice(0, 8)}`} layout='horizontal' size='middle'>
      <Descriptions.Item label="Bác sĩ">{data?.doctorUser?.firstname} {data?.doctorUser?.lastname}</Descriptions.Item>
      <Descriptions.Item label="Số giấy phép">{data.doctorUser.doctor.license_number}</Descriptions.Item>
      <Descriptions.Item label="Chuyên ngành">{data.doctorUser.doctor.specialty}</Descriptions.Item>
      <Descriptions.Item label="Bệnh nhân">{data?.user?.firstname} {data?.user?.lastname}</Descriptions.Item>
      <Descriptions.Item label="Số điện thoại">{data.user.phone}</Descriptions.Item>
      <Descriptions.Item label="Địa chỉ">{data.user.address}</Descriptions.Item>
      <Descriptions.Item label="Giờ gặp" span={3}>{data.time} AM</Descriptions.Item>
      <Descriptions.Item label="Ngày gặp" span={3}>{formmatDate}</Descriptions.Item>
      <Descriptions.Item label="Ghi chú" span={3}>{data.notes}</Descriptions.Item>
      <Descriptions.Item label="Trạng thái" span={3}>
        <Tag
          color={data.status === "COMING" ? "green"
            : data.status === "COMPLETE" ? "#0073B7"
              : "default"}
          style={{ fontWeight: 600 }}
          onClick={() => { }}
        >
          {data.status}
        </Tag>
      </Descriptions.Item>
    </Descriptions>
  )
}
