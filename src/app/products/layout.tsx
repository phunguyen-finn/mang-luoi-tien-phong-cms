import Header from "@/components/common/Header";
import NavigationMenu from "@/components/common/NavigationMenu";
import { ShopOutlined } from '@ant-design/icons';
import Layout, { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { headers } from "next/headers";

const layoutStyle: any = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: '100vh'
}

const description = (
    <>
        Thêm sản phẩm mới, chỉnh sửa thông tin sản phẩm, và xem danh sách sản phẩm.
    </>
)

export default function CoreLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const user = JSON.parse(headers().get('x-MLTP-Auth') as string);

    return <Layout style={{ height: '100vh', display: 'flex' }}>
        <Sider width='256px' theme='light'>
            <NavigationMenu user={user} />
        </Sider>
        <Content style={{ overflowY: 'auto', height: '100vh', width: "100%" }}>
            <Layout style={layoutStyle}>
                <Header icon={<ShopOutlined />} title="Sản phẩm" description={description} />
                {children}
            </Layout>
        </Content>
    </Layout>

}