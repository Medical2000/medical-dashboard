import React from 'react';
import { Button, Col, DatePicker, Form, FormInstance, Input, Radio, Row, Select, Upload } from 'antd';
import { IRole, IUser } from '../../interface/auth';
import { PlusOutlined } from '@ant-design/icons';

interface Iporps {
  form: FormInstance<any>;
  handleCreate: (values: IUser) => void;
  role: IRole[]
}

const layout = {
  labelCol: { span: 6 },
};


const Create = ({ handleCreate, form, role }: Iporps) => {
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  return (
    <Form
      {...layout}
      form={form}
      size='large'
      name="nest-messages"
      onFinish={handleCreate}
      style={{ marginTop: 20,overflowX: 'hidden' }}
      validateMessages={validateMessages}
    >
      <Row gutter={[24, 8]}>
        <Col span={12}>
          <Form.Item name={'user_name'} label="Tên tài khoản" rules={[{ required: true }]}  >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={'password'} label="Mật khẩu" rules={[{ required: true }]} >
            <Input />
          </Form.Item>
        </Col>
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
          <Form.Item name={'roleId'} label="Tên quyền">
            <Select
              showSearch
              placeholder="Chọn quyền"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={role.map((e) => ({
                value: e.id,
                label: e.role_name
              }))}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name={'date_of_birth'} label="Ngày sinh">
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

      <Row justify={"end"} align={'bottom'} style={{ marginTop: 30 }} >
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </Row>

    </Form>
  )
}

export default Create