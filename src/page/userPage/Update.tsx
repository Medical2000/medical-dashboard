import React, { useEffect } from 'react';
import { Button, Col, DatePicker, Form, FormInstance, Input, Radio, Row, Select, Upload } from 'antd';
import { IRole, IUser } from '../../interface/auth';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
interface Iporps {
    form?: FormInstance<any>;
    handleUpdate: (values: IUser) => void;
    data: IUser;
    role: IRole[]
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};


const Update = ({ handleUpdate, data, role }: Iporps) => {
    const [form] = Form.useForm();

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

    useEffect(() => {
        const formatDate = dayjs(data.date_of_birth);
        form.setFieldsValue({ ...data, formatDate })
    }, [data])

    return (
        <Form
            {...layout}
            form={form}
            size='large'
            name="nest-messages"
            onFinish={(e) => handleUpdate({ ...e, id: data.id })}
            style={{ marginTop: 20, overflowX: 'hidden' }}
            validateMessages={validateMessages}
        >
            <Row gutter={[24, 8]}>
                <Col span={12}>
                    <Form.Item name={'user_name'} label="User Name" rules={[{ required: true }]}  >
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
                    <Form.Item name={'formatDate'} label="Date of birth">
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

            <Row justify={"end"} align={'bottom'} style={{ marginTop: 30 }} >
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Row>

        </Form>
    )
}

export default Update;