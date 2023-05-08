
import { Button, Col, DatePicker, Form, FormInstance, Input, Radio, Row, Select, Upload } from 'antd';
import { IDoctor } from '../../../interface/doctor';
import { IPatient } from '../../../interface/patient';

const General = ({ data }: { data?: IPatient }) => {

  return (
    <Row gutter={[24, 8]}>
      <Col span={12}>
        <Form.Item name={'user_name'} label="Tên tài khoản" rules={[{ required: true }]}  >
          <Input />
        </Form.Item>
      </Col>
      {
        !data && (<Col span={12}>
          <Form.Item name={'password'} label="Mật khẩu"  >
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
        <Form.Item name={'firstname'} label="Họ tên đệm">
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name={'lastname'} label="Tên">
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name={'phone'} label="Số điện thoại">
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name={'gender'} label="Giới tính">
          <Select
            showSearch
            placeholder="Chọn giới tính"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "Female",
                label: "Nữ"
              },
              {
                value: "Male",
                label: "Nam"
              },
              {
                value: "Other",
                label: "Khác"
              },

            ]}
          />

        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name={data ? 'formatDate' : 'date_of_birth'} label="Ngày sinh">
          <DatePicker format='YYYY-MM-DD' size='large' />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name={'address'} label="Địa chỉ">
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name={'status'} label="Trạng thái">
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