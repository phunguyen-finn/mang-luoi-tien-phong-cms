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

export const MENU_ITEMS: any = [
    {
        key: MENU_ITEM_KEYS.STATIC,
        icon: <FormatPainterOutlined />,
        label: 'Nội dung tĩnh'
    },
    {
        key: MENU_ITEM_KEYS.PRODUCTS,
        icon: <ShopOutlined />,
        label: 'Sản phẩm',
    },
    {
        key: MENU_ITEM_KEYS.POSTS,
        icon: <EditOutlined />,
        label: 'Bài viết',
    },
    {
        key: MENU_ITEM_KEYS.ACTIVITIES,
        icon: <NodeExpandOutlined />,
        label: 'Hoạt động',
    },
    {
        key: MENU_ITEM_KEYS.ALBUMS,
        icon: <CameraOutlined />,
        label: 'Hình ảnh',
    },
    {
        key: MENU_ITEM_KEYS.ACCOUNTS,
        icon: <UserOutlined />,
        label: 'Quản lí Tài khoản',
    },
    {
        key: MENU_ITEM_KEYS.SIGNOUT,
        label: 'Đăng xuất',
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

    const onClick = async ({ key }: any) => {
        switch (key) {
            case MENU_ITEM_KEYS.STATIC:
                router.push('/');
                break;
            case MENU_ITEM_KEYS.GOOGLE_ANALYTICS:
                window.open('https://console.firebase.google.com/u/1/project/ethnicityvn/analytics/app/web:NzQ4ZGU4YTQtY2Y3Yy00OGNhLWI0OWEtYTU1N2QyNmY5MWMx/overview/reports~2Fdashboard%3Fr%3Dfirebase-overview&fpn%3D1019016524204');
                break;
            case MENU_ITEM_KEYS.CONSOLE:
                window.open('https://console.firebase.google.com/u/1/project/ethnicityvn/overview');
                break;
            case MENU_ITEM_KEYS.GITHUB:
                window.open('https://github.com/nnphongphu/ethnicityviet-cms-client');
                break;
            case MENU_ITEM_KEYS.SIGNOUT:
                message.loading('Đăng xuất..', 0);
                await deleteSession();
                await AuthService.logout();
                message.destroy();
                router.replace('/login');
                break;
            default:
                router.push('/' + key);
                break;
        }
    }
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
            onSelect={onClick}
            selectedKeys={[pathname.split('/')[1] || 'static']}
        />
    </div>
}