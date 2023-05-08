import React from 'react';
import { Button, Form, FormInstance, Input, Row } from 'antd';
import { IBloodGroup } from '../../interface/patient';
interface Iporps {
  form: FormInstance<any>;
  handleCreate: (values: IBloodGroup) => void;
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};


const Create = ({ handleCreate, form }: Iporps) => {
  const validateMessages = {
    required: '${label} is required!',
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

      <Form.Item name={'blood_name'} label="Tên nhóm máu" rules={[{ required: true }]}>
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