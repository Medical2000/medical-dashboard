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
  labelCol: { span: 4 },
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
          <Form.Item name={'user_name'} label="User Name" rules={[{ required: true }]}  >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={'password'} label="Password" rules={[{ required: true }]} >
            <Input />
          </Form.Item>
        </Col>
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
          <Form.Item name={'roleId'} label="Role">
            <Select
              showSearch
              placeholder="Select a role"
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
          <Form.Item name={'date_of_birth'} label="Date of birth">
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

        <Col span={12}>
          <Form.Item name={'avatar'} label="Avatar">
            <Upload listType="picture-circle">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Col>

      </Row>

      <Row justify={"end"} align={'bottom'} style={{ marginTop: 30 }} >
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Row>

    </Form>
  )
}

export default Create