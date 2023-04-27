
import { Button, Col, DatePicker, Form, FormInstance, Input, Radio, Row, Select, Upload } from 'antd';
import { IDoctor } from '../../../interface/doctor';
import { IPatient } from '../../../interface/patient';

const General = ({ data }: { data?: IPatient }) => {

  return (
    <Row gutter={[24, 8]}>
      <Col span={12}>
        <Form.Item name={'user_name'} label="User Name" rules={[{ required: true }]}  >
          <Input />
        </Form.Item>
      </Col>
      {
        !data && (<Col span={12}>
          <Form.Item name={'password'} label="Password"  >
            <Input />
          </Form.Item>
        </Col>)
      }

      <Col span={12}>
        <Form.Item name={'email'} label="Email" rules={[{ required: true }]} >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name={'firstname'} label="First Name">
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name={'lastname'} label="Last Name">
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name={'phone'} label="Phone">
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name={'gender'} label="Gender">
          <Select
            showSearch
            placeholder="Select a gender"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "Female",
                label: "Female"
              },
              {
                value: "Male",
                label: "Male"
              },
              {
                value: "Other",
                label: "Other"
              },

            ]}
          />

        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name={data ? 'formatDate' : 'date_of_birth'} label="Date of birth">
          <DatePicker format='YYYY-MM-DD' size='large' />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name={'address'} label="Address">
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name={'status'} label="Status">
          <Radio.Group defaultValue={true}  >
            <Radio value={true}>Active</Radio>
            <Radio value={false}>Inactive</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
    </Row>
  )
}

export default General;