import { headers } from 'next/headers'
import Layout, { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import NavigationMenu from "@/components/common/NavigationMenu";
import Header from '@/components/common/Header';
import { FormatPainterOutlined } from '@ant-design/icons';
import StaticForm from '@/components/pages/static/StaticForm';
import StaticService from '@/services/static.service';
import { AUTHORITY } from '@/services/user.service';


const layoutStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
}

const description = (
  <>
    Thêm logo đối tác và testimonials vào trang chủ
  </>
)

export default async function Home() {
  const user = JSON.parse(headers().get('x-MLTP-Auth') as string);
  const _static = await StaticService.getStatic();
  const isAdmin = user.authority === AUTHORITY.ADMINISTRATOR;

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width='256px' theme='light'>
        <NavigationMenu user={user} />
      </Sider>
      <Content style={{ overflowY: 'auto', height: '100vh', width: "100%" }}>
        <Layout style={layoutStyle}>
          <Header icon={<FormatPainterOutlined />} title="Nội dung tĩnh" description={description} />
          <StaticForm initialData={_static} isAdmin={isAdmin} />
        </Layout>
      </Content>
    </Layout>
  );
}
