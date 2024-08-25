'use client';

import AuthService from "@/services/auth.service";
import { App, Button, Divider, Layout, List, Typography } from "antd";
import { User } from "@/services/user.service";
import { CalendarOutlined, EditOutlined, UserOutlined, UserDeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import Popconfirm from "antd/es/popconfirm";
import { deleteAccount } from "@/services/admin/session.service";
import { useRouter } from "next/navigation";

const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: 800,
    height: 40,
    justifyContent: 'end',
    marginBottom: 16
}

export function AccountsList({ users, isAdmin }: { users: User[], isAdmin: boolean }) {
    const { message } = App.useApp();
    const router = useRouter();

    const renderItem = (item: User) => {
        const description = (
            <>
                <Typography.Text style={{ color: "gray" }}>
                    <CalendarOutlined /> Tạo vào {item.createdAt.toLocaleDateString()}
                </Typography.Text>
                {
                    item.createdBy && <>
                        <Divider type="vertical" />
                        <Typography.Text style={{ color: "gray" }}>
                            <UserOutlined /> Tạo bởi {item.createdBy}
                        </Typography.Text>
                    </>
                }
            </>
        );

        const handleDelete = () => {
            message.loading('Xoá tài khoản...', 0);
            deleteAccount(item.uid).then(() => {
                message.destroy();
                message.success('Xoá tài khoản thành công!', 5);
                router.refresh();
            }).catch((error) => {
                message.destroy();
                message.error('Xoá tài khoản thất bại: ' + error.message, 5);
            });
        }

        return (
            <List.Item
                key={item.email}
                actions={[
                    <Link href={`/accounts/${item.uid}`}>
                        <Button type="link" disabled={!isAdmin}><EditOutlined /> Chỉnh sửa</Button>
                    </Link>,
                    <Popconfirm
                        title="Xoá tài khoản"
                        description="Bạn chắc chứ?"
                        onConfirm={handleDelete}
                        okText="Xác nhận"
                        cancelText="Huỷ"
                    >
                        <Button type='primary' disabled={!isAdmin} danger><UserDeleteOutlined />Xoá</Button>
                    </Popconfirm>
                ]}
            >
                <List.Item.Meta
                    title={`${item.displayName} (${item.email})`}
                    description={description}
                />
            </List.Item >
        );
    };

    return (
        <Layout>
            <div style={contentStyle}>
                <Link href="/accounts/create" style={{ width: 118 }}>
                    <Button type='primary' disabled={!isAdmin} style={{ position: 'absolute' }}>Tạo tài khoản</Button>
                </Link>
            </div>
            <List
                dataSource={users}
                renderItem={renderItem}
            />
        </Layout>
    );
}

export default AccountsList;