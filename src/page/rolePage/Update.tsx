import React, { useEffect } from 'react';
import { Button, Form, FormInstance, Input, Row } from 'antd';
import { IWorkplace } from '../../interface/workplace';
import { IRole } from '../../interface/auth';
interface Iporps {
    form?: FormInstance<any>;
    handleUpdate: (values: IRole) => void;
    data: IRole
}

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};


const Update = ({ handleUpdate, data }: Iporps) => {
    const [form] = Form.useForm();

    const validateMessages = {
        required: '${label} is required!',
    };

    useEffect(() => {
        form.setFieldsValue(data)
    }, [data])

    return (
        <Form
            {...layout}
            form={form}
            size='large'
            name="update"
            onFinish={(e) => handleUpdate({ ...e, id: data.id })}
            style={{ marginTop: 20 }}
            validateMessages={validateMessages}
        >
            <Form.Item name={'role_name'} label="Tên quyền" rules={[{ required: true }]}>
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

export default Update;