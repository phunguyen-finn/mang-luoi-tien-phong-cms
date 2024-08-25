'use client';

import { Layout, Breadcrumb, App } from "antd";
import AccountForm from "./AccountForm";
import Link from "next/link";
import AccountEditForm from "./AccountEditForm";
import { createAccount, editAccount } from "@/services/admin/session.service";
import { User } from "@/services/user.service";

const layoutStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    marginBottom: '10px'
}

export function AccountPage({ user, current_user_email }: { user?: User, current_user_email: string }) {
    const { message } = App.useApp();

    const handleCreate = (account: any) => {
        message.loading('Tạo tài khoản...', 0);
        createAccount(account.email, account.password, account.displayName, account.authority, current_user_email).then(() => {
            message.destroy();
            message.success('Tạo tài khoản thành công!', 5);
        }).catch((error) => {
            message.destroy();
            message.error('Tạo tài khoản thất bại: ' + error.message, 5);
        });
    };

    const editUser = (account: any) => {
        message.loading('Tạo tài khoản...', 0);
        editAccount(account).then(() => {
            message.destroy();
            message.success('Tạo tài khoản thành công!', 5);
        }).catch((error) => {
            message.destroy();
            message.error('Tạo tài khoản thất bại: ' + error.message, 5);
        });
    }

    return (
        <Layout style={layoutStyle}>
            <Layout>
                <Breadcrumb style={{ marginBottom: 10 }}>
                    <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item><Link href="/accounts">Tài khoản</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{user ? "Sửa tài khoản" : "Tạo tài khoản"}</Breadcrumb.Item>
                </Breadcrumb>
                {
                    user
                        ? <AccountEditForm user={user} onSubmit={editUser} />
                        : <AccountForm onSubmit={handleCreate} />
                }
            </Layout>
        </Layout >
    );
}

export default AccountPage;