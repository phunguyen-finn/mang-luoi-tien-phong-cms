import Header from "@/components/common/Header";
import NavigationMenu from "@/components/common/NavigationMenu";
import { EditOutlined } from '@ant-design/icons';
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
        Quản lý bài viết. Viết bài để chia sẻ thêm về dự án, và cập
        nhật của Mạng lưới Tiên phong. Chỉ có bài viết
        mục Công khai được hiển thị trên trang chính, bạn luôn có thể
        thay đổi trạng thái của bài viết để lưu trữ hoặc xóa.
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
                <Header icon={<EditOutlined />} title="Kho Bài Viết" description={description} />
                {children}
            </Layout>
        </Content>
    </Layout>

}