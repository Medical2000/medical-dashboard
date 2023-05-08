import React, { useState } from 'react';
import './styles.css';
import { Button, Checkbox, Form, Input, Alert } from 'antd';
import { IUserLogin } from '../../interface/auth';
import { authProviders } from '../../Api/auth';
import { showNotification } from '../../components/notification/notification';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const onFinish = (values: IUserLogin) => {
        authProviders(values).then(() => {
            navigate('/home')
        }).catch((err) => {
            showNotification('error', 'Error', err.message);
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='container'>
            <img src={require("../../asset/image/BigLogo.png")} className='imageName' />
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
                            label="Tài khoản"
                            name="user_name"
                            className="formLogin"
                            style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            className="formLogin"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 9, span: 16 }}>
                            <Checkbox>Ghi nhớ</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
                            <Button style={{ width: '100%', height: 40, backgroundColor: '#1C6BA4' }} type="primary" htmlType="submit">
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>
        </div>
    )
}
