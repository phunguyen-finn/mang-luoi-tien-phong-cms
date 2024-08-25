'use client'

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import AuthService from '@/services/auth.service';
import Button from 'antd/es/button';
import Checkbox from 'antd/es/checkbox';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Layout from 'antd/es/layout';
import Typography from 'antd/es/typography';
import App from 'antd/es/app';
import { createSession } from '@/services/admin/session.service';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { validateMessages } from '@/constants';


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

const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

export default function LoginPage() {
    const { message } = App.useApp();
    const router = useRouter();


    const onFinish = async (values: any) => {
        message.loading('Đăng nhập..', 0);
        try {
            const user = await AuthService.login(values.username, values.password);
            await createSession(await user.user.getIdToken(), values.remember);
            message.destroy();
            router.replace('/');
        } catch (error) {
            message.destroy();
            message.error('Đăng nhập thất bại! Vui lòng thử lại...');
        }
    };

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
                            name='username'
                            labelAlign='left'
                            rules={[{ required: true, type: 'email' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            labelAlign='left'
                            rules={[{ required: true }, { min: 8 }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
                        </Form.Item>
                        <div style={rowStyle}>
                            <Form.Item name='remember' valuePropName='checked'>
                                <Checkbox>Duy trì đăng nhập</Checkbox>
                            </Form.Item>
                            <Typography.Link style={{ marginTop: '3px' }} href="/reset-password">
                                Quên mật khẩu
                            </Typography.Link>
                        </div>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' style={{ marginBottom: "0px", width: '300px' }}>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </Layout.Content>
                <Layout.Footer style={{ textAlign: 'center' }}>
                    <Typography.Text type='secondary'>Mạng lưới tiên phong © 2024</Typography.Text>
                </Layout.Footer>
            </div>
        </Layout>
    );
}