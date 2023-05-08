import React from 'react';
import { Button, Form, FormInstance, Input, Row } from 'antd';
import { IWorkplace } from '../../interface/workplace';
interface Iporps {
  form: FormInstance<any>;
  handleCreate: (values: IWorkplace) => void;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};


const Create = ({ handleCreate, form }: Iporps) => {
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  return (
    <Form
      {...layout}
      form={form}
      size='large'
      name="nest-messages"
      onFinish={handleCreate}
      style={{ marginTop: 20 }}
      validateMessages={validateMessages}
    >

      <Form.Item name={'name'} label="Tên" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={'phone'} label="Số điện thoại"  >
        <Input />
      </Form.Item>
      <Form.Item name={'email'} label="Email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>

      <Form.Item name={'city'} label="Thành phố" >
        <Input />
      </Form.Item>
      <Form.Item name={'address'} label="Địa chỉ" >
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={'type'} label="Loại">
        <Input />
      </Form.Item>
      <Row justify={"end"} align={'bottom'} style={{ marginTop: 30 }} >
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </Row>

    </Form>
  )
}

export default Create