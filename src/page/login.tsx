import React, { useState } from 'react';
import './styles.css';
import { Button, Checkbox, Form, Input } from 'antd';

export const Login = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
        console.log(process.env.PUBLIC_URL_API
        )
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='container'>
            <img src={require("../asset/image/BigLogo.png")} className='imageName' />
            <div className='boxLogin'>
                <div className='warrper'>
                    <h2 className='title'>Medical</h2>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 700, width: '70%', justifyContent: 'center', alignItems: 'center' }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            className="formLogin"
                            style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            className="formLogin"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 9, span: 16 }}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
                            <Button style={{ width: '100%', height: 40, backgroundColor: '#1C6BA4' }} type="primary" htmlType="submit">
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>
        </div>
    )
}
