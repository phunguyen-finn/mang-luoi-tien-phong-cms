'use client';

import ActivityService, { Activity } from "@/services/activity.service";
import Layout from "antd/es/layout";
import Breadcrumb from "antd/es/breadcrumb";
import App from "antd/es/app";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ActivityFormWrapper from "./ActivityFormWrapper";
import { Suspense } from "react";

const layoutStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    marginBottom: '10px',
    width: '800px',
}

export function ActivityPage({ activity, isAdmin }: { activity?: Activity, isAdmin: boolean }) {
    const router = useRouter();
    const { message } = App.useApp();

    const handleUpdate = (_activity: any) => {
        if (activity) {
            message.loading('Cập nhật hoạt động ...', 0);
            ActivityService.updateActivity(activity.id, _activity).then(() => {
                message.destroy();
                message.success('Cập nhật hoạt động thành công!', 5);
                router.push('/activities');
            }).catch((error) => {
                message.destroy();
                message.error('Cập nhật hoạt động thất bại: ' + error.message, 5);
            });
        }
    }

    const handleCreate = (activity: any) => {
        message.loading('Tạo hoạt động..', 0);
        ActivityService.createActivity(activity).then(() => {
            message.destroy();
            message.success('Tạo hoạt động thành công!', 5);
            router.push('/activities');
        }).catch((error) => {
            message.destroy();
            message.error('Tạo hoạt động thất bại ' + error.message, 5);
        });
    }

    return (
        <Layout style={layoutStyle}>
            <Layout style={{ flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
                <Breadcrumb style={{ marginBottom: 10 }} rootClassName="w-full flex justify-start">
                    <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item><Link href="/activities">Hoạt động</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{activity ? activity.title : 'Tạo hoạt động'}</Breadcrumb.Item>
                </Breadcrumb>
                <Suspense fallback={null}>
                    <ActivityFormWrapper initialData={activity} onSubmit={activity ? handleUpdate : handleCreate} isAdmin={isAdmin} />
                </Suspense>
            </Layout>
        </Layout >
    );
}

export default ActivityPage;