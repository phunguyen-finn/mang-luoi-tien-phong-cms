import { Layout } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import Header from '@/components/common/Header';
import Sider from 'antd/es/layout/Sider';
import NavigationMenu from '@/components/common/NavigationMenu';
import { Content } from 'antd/es/layout/layout';
import { headers } from 'next/headers';

const layoutStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
}

const description = (
    <>
        Quản lý tài khoản người dùng. Bạn có thể thay đổi thông tin cá nhân, xoá tài khoản, và
        tạo tài khoản mới tại trang này.
    </>
)

export default async function AccountLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const user = JSON.parse(headers().get('x-MLTP-Auth') as string);

    return <Layout style={{ height: '100vh', display: 'flex' }}>
        <Sider width='256px' theme='light'>
            <NavigationMenu user={user} />
        </Sider>
        <Content style={{ overflowY: 'auto', height: '100vh', width: "100%" }}>
            <Layout style={layoutStyle}>
                <Header icon={<TeamOutlined />} title="Quản lí Tài khoản" description={description} />
                {children}
            </Layout>
        </Content>
    </Layout >;
}

