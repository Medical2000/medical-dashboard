import React from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { IDegree } from '../../../interface/doctor';
import { IWorkplace } from '../../../interface/workplace';

interface Iporps {
  WorkplaceSelect?: IWorkplace[];
  DegreesSelect?: IDegree[];
}

const layout = {
  labelCol: { span: 6 },
};


const Task = ({ WorkplaceSelect, DegreesSelect }: Iporps) => {
  const { TextArea } = Input;
  return (

    <Row gutter={[24, 8]}>
      <Col span={12}>
        <Form.Item name={'specialty'} label="Chuyên Môn" rules={[{ required: true }]}  >
          <Input width={100} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name={'license_number'} label="Số giấy phép" rules={[{ required: true }]} >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name={'exp'} label="Kinh nghiệm" rules={[{ required: true }]} >
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name={'id_workplace'} label="Nơi làm việc">
          <Select
            showSearch
            placeholder="Chọn nơi làm việc"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={WorkplaceSelect&& WorkplaceSelect.map((e) => ({
              value: e.id,
              label: e.name
            }))}
          />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name={'id_degree'} label="Bằng cấp">
          <Select
            showSearch
            placeholder="Chọn bằng cấp"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={DegreesSelect && DegreesSelect.map((e) => ({
              value: e.id,
              label: e.name
            }))}
          />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name={'about'} label="Giới thiệu">
          <TextArea
            showCount
            maxLength={500}
            style={{ height:90, marginBottom: 10, resize:'none' }}
            placeholder="Giới thiệu về bác sĩ"
          />
        </Form.Item>
      </Col>

    </Row>

    // </Form>
  )
}

export default Task;