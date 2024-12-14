'use client';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Button, Checkbox, Col, Divider, Form, Input, Row } from 'antd';
import Link from 'next/link';
const Login = () => {
    type FieldType = {
        username?: string;
        password?: string;
        // remember?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = values => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] =
        errorInfo => {
            console.log('Failed:', errorInfo);
        };
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
                        <legend>Login</legend>
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
                                <Input placeholder='Entern your email' />
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
                                <Input.Password placeholder='Enater your password' />
                            </Form.Item>

                            <Form.Item>
                                <Button type='primary' htmlType='submit'>
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                        <Link href={'/'}>
                            <ArrowLeftOutlined /> Back to Home
                        </Link>
                        <Divider />
                        <div style={{ textAlign: 'center' }}>
                            Are you have an account?{' '}
                            <Link href={'/auth/register'}>Register here</Link>
                        </div>
                    </fieldset>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
