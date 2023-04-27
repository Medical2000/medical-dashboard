import React from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { IDegree } from '../../../interface/doctor';
import { IWorkplace } from '../../../interface/workplace';
import { IBloodGroup } from '../../../interface/patient';

interface Iporps {
  bloodGroups?: IBloodGroup[],

}

const layout = {
  labelCol: { span: 6 },
};


const Task = ({ bloodGroups }: Iporps) => {
  const { TextArea } = Input;
  return (

    <Row gutter={[24, 8]}>
      <Col span={12}>
        <Form.Item name={'health_insurance_number'} label="Số BHYT" rules={[{ required: true }]}  >
          <Input width={100} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name={'height'} label="Chiều cao"  >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name={'weight'} label="Cân nặng"  >
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name={'id_workplace'} label="Nhóm máu">
          <Select
            showSearch
            placeholder="Chọn nhóm máu"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={bloodGroups && bloodGroups.map((e) => ({
              value: e.id,
              label: e.blood_name
            }))}
          />
        </Form.Item>
      </Col>

    </Row>

    // </Form>
  )
}

export default Task;