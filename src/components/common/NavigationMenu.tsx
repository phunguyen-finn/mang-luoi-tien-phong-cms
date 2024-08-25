'use client';

import { EditOutlined, LogoutOutlined, ShopOutlined, GoogleOutlined, CodeOutlined, GithubOutlined, FolderOpenOutlined, CopyOutlined, FormatPainterOutlined, NodeExpandOutlined, CameraOutlined, UserOutlined } from "@ant-design/icons";
import { usePathname } from 'next/navigation';
import Typography from "antd/es/typography/Typography";
import Menu from "antd/es/menu";
import { useRouter } from "next/navigation";
import AuthService from "@/services/auth.service";
import { deleteSession } from "@/services/admin/session.service";
import App from "antd/es/app";
import Image from "next/image";
import Link from "next/link";

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
    GITHUB: 'github',
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
                message.destroy();
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
                    key: MENU_ITEM_KEYS.GOOGLE_ANALYTICS,
                    icon: <GoogleOutlined />,
                    label: 'Google Analytics'
                },
                {
                    key: MENU_ITEM_KEYS.CONSOLE,
                    icon: <CodeOutlined />,
                    label: 'Console'
                },
                {
                    key: MENU_ITEM_KEYS.GITHUB,
                    icon: <GithubOutlined />,
                    label: 'GitHub'
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