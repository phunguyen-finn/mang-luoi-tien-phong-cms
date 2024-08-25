import { headers } from 'next/headers'
import Layout from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import NavigationMenu from "@/components/common/NavigationMenu";

export default function Home() {
  const user = JSON.parse(headers().get('x-MLTP-Auth') as string);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width='256px' theme='light'>
        <NavigationMenu user={user} />
      </Sider>
      <Layout style={{ overflowY: 'auto' }}>

      </Layout>
    </Layout>
  );
}
