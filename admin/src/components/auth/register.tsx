'use client';
import React from 'react';
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

const Register = () => {
    const onFinish = async (values: any) => {};

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                height: '100vh',
                // backgroundColor: 'coral',
                width: '100%'
            }}
        >
            <Row
                justify={'center'}
                style={{ marginTop: '30px', width: '100%' }}
            >
                <Col xs={24} md={16} lg={8}>
                    <fieldset
                        style={{
                            padding: '15px',
                            margin: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '5px'
                        }}
                    >
                        <legend>Register Account</legend>
                        <Form
                            name='basic'
                            onFinish={onFinish}
                            autoComplete='off'
                            layout='vertical'
                        >
                            <Form.Item
                                label='Email'
                                name='email'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label='Password'
                                name='password'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item label='Name' name='name'>
                                <Input />
                            </Form.Item>

                            <Form.Item>
                                <Button type='primary' htmlType='submit'>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                        <Link href={'/'}>
                            <ArrowLeftOutlined /> Back to Home
                        </Link>
                        <Divider />
                        <div style={{ textAlign: 'center' }}>
                            Are you have an account?{' '}
                            <Link href={'/auth/login'}>Login Here</Link>
                        </div>
                    </fieldset>
                </Col>
            </Row>
        </div>
    );
};

export default Register;
