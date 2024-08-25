'use client';

import Layout from "antd/es/layout";
import Typography from "antd/es/typography";

interface headerProps {
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
}

export function Header({ icon, title, description }: headerProps) {
    return <Layout.Header style={{ backgroundColor: "#F5F5F5", width: 800, textAlign: "left", padding: 0, height: 'auto', marginTop: '30px' }}>
        <Typography>
            <Typography.Title level={3}>{icon} {title}</Typography.Title>
            <Typography.Paragraph>
                {description}
            </Typography.Paragraph>
        </Typography>
    </Layout.Header>
}

export default Header;