'use client';

import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, Typography, App } from 'antd';
import { validateMessages } from '@/constants/index';
import AuthService from '@/services/auth.service';
import Image from 'next/image';

const layoutStyle: React.CSSProperties = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

const contentStyle: React.CSSProperties = {
    maxWidth: '350px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

export default function ResetPasswordPage() {
    const { message } = App.useApp();

    const onFinish = (values: any) => {
        message.loading('Gửi email...', 0);
        AuthService.passwordReset(values.email).then(() => {
            message.destroy();
            message.success('Email gửi thành công!', 5);
        }).catch((error: any) => {
            message.destroy();
            message.error('Gửi email thất bại: ' + error.message, 5);
        })
    }

    return (
        <Layout style={layoutStyle}>
            <div>
                <Layout.Content style={contentStyle}>
                    <Image
                        src="/logo.png"
                        alt="logo"
                        className="dark:invert mb-4"
                        width={75}
                        height={75}
                    />
                    <Form
                        name='login-form'
                        initialValues={{ remember: false }}
                        onFinish={onFinish}
                        colon={false}
                        validateMessages={validateMessages}
                    >
                        <Form.Item
                            name='email'
                            labelAlign='left'
                            rules={[{ required: true, type: 'email' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' style={{ marginBottom: "0px", width: '300px' }}>
                                Gửi email khôi phục mật khẩu
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button href='/login' type='link' style={{ marginBottom: "0px", alignSelf: 'flex-end' }}>Trở về trang đăng nhập</Button>
                </Layout.Content>
                <Layout.Footer style={{ textAlign: 'center' }}>
                    <Typography.Text type='secondary'>Mạng lưới Tiên phong Vietnam © 2024</Typography.Text>
                </Layout.Footer>
            </div>
        </Layout>
    );
}