'use client';

import { CameraOutlined, CodeOutlined, CopyOutlined, EditOutlined, FolderOpenOutlined, FormatPainterOutlined, GithubOutlined, GlobalOutlined, GoogleOutlined, LogoutOutlined, NodeExpandOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";

import App from "antd/es/app";
import AuthService from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import Menu from "antd/es/menu";
import Typography from "antd/es/typography/Typography";
import { deleteSession } from "@/services/admin/session.service";
import { useEffect } from "react";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";

export const MENU_ITEM_KEYS = {
    STATIC: 'static',
    PRODUCTS: 'products',
    POSTS: 'posts',
    ACTIVITIES: 'activities',
    ALBUMS: 'albums',
    ACCOUNTS: 'accounts',
    SIGNOUT: 'signout',
    GOOGLE_ANALYTICS: 'google-analytics',
    CONSOLE: 'console',
    GITHUB_CMS: 'github_cms',
    GITHUB: 'github',
    VISIT: 'visit',
}

const logoStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 30px',
    marginRight: '10px'
}

const textStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '0px 0px',
    maxHeight: 54,
    textOverflow: "ellipsis",
    msTextOverflow: "ellipsis",
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
}


export default function NavigationMenu({ user }: any) {
    const pathname = usePathname();
    const router = useRouter();
    const { message } = App.useApp();

    useEffect(() => {
        return () => {
            message.destroy();
        }
    }, [])


    const MENU_ITEMS: any = [
        {
            key: MENU_ITEM_KEYS.STATIC,
            icon: <FormatPainterOutlined />,
            label: <Link href="/">Nội dung tĩnh</Link>
        },
        {
            key: MENU_ITEM_KEYS.PRODUCTS,
            icon: <ShopOutlined />,
            label: <Link href="/products">Sản phẩm</Link>,
        },
        {
            key: MENU_ITEM_KEYS.POSTS,
            icon: <EditOutlined />,
            label: <Link href="/posts">Bài viết</Link>,
        },
        {
            key: MENU_ITEM_KEYS.ACTIVITIES,
            icon: <NodeExpandOutlined />,
            label: <Link href="/activities">Hoạt động</Link>,
        },
        {
            key: MENU_ITEM_KEYS.ALBUMS,
            icon: <CameraOutlined />,
            label: <Link href="/albums">Albums</Link>,
        },
        {
            key: MENU_ITEM_KEYS.ACCOUNTS,
            icon: <UserOutlined />,
            label: <Link href="/accounts">Quản lý tài khoản</Link>,
        },
        {
            key: MENU_ITEM_KEYS.SIGNOUT,
            label: <div onClick={async () => {
                message.loading('Đăng xuất..', 0);
                await deleteSession();
                await AuthService.logout();
                router.replace('/login');
            }}>Đăng xuất</div>,
            icon: <LogoutOutlined />,
        },
        {
            type: "divider",
        },
        {
            type: 'group',
            label: 'Liên kết khác',
            children: [
                {
                    key: MENU_ITEM_KEYS.VISIT,
                    icon: <GlobalOutlined />,
                    label: <a target="_blank" href='https://mangluoitienphong.org/'>Trang công khai</a>
                },
                {
                    key: MENU_ITEM_KEYS.GITHUB_CMS,
                    icon: <GithubOutlined />,
                    label: <a target="_blank" href="https://github.com/nnphongphu/mang-luoi-tien-phong-cms">Mã nguồn CMS</a>
                },
                {
                    key: MENU_ITEM_KEYS.GITHUB,
                    icon: <GithubOutlined />,
                    label: <a target="_blank" href="https://github.com/nnphongphu/mang-luoi-tien-phong-core">Mã nguồn</a>
                },
                {
                    key: MENU_ITEM_KEYS.GOOGLE_ANALYTICS,
                    icon: <GoogleOutlined />,
                    label: <a target="_blank" href="https://console.firebase.google.com/u/1/project/mangluoitienphong-de378/analytics/app/web:YzNhZjQ0YmQtZjQ4Ny00ZmU5LThhYTYtMDQ0MzhmMGU1MmQw/overview/reports~2Fdashboard%3Fr%3Dfirebase-overview&fpn%3D539909504889">
                        Google Analytics
                    </a>
                },
                {
                    key: MENU_ITEM_KEYS.CONSOLE,
                    icon: <CodeOutlined />,
                    label: <a target="_blank" href="https://console.firebase.google.com/u/1/project/mangluoitienphong-de378/overview">Console</a>
                },
            ],
        }
    ];

    return <div style={{ display: 'flex', flexDirection: "column" }}>
        <div className="flex items-center">
            <Image src='/logo.png' alt='logo' style={logoStyle} width={60} height={60} />
            <Typography style={textStyle}>
                🚀 Signed in as <br />
                <b>{user?.email}</b>
            </Typography>
        </div>
        <Menu
            style={{
                width: 256,
                height: "calc(100vh - 80px)",
                textAlign: "left",
            }}
            mode="inline"
            items={MENU_ITEMS}
            selectedKeys={[pathname.split('/')[1] || 'static']}
        />
    </div>
}