'use client';

import { DeploymentUnitOutlined, FolderOpenOutlined, PullRequestOutlined } from "@ant-design/icons";
import { Timestamp } from "firebase/firestore/lite";
import ActivityService, { Activity, ACTIVITY_STATUS } from "@/services/activity.service";
import ActivitiesList from "./ActivitiesList";
import Button from 'antd/es/button';
import Layout from 'antd/es/layout';
import Tabs from 'antd/es/tabs';
import Link from "next/link";

const loadData = (status: ACTIVITY_STATUS) => (cursor: Timestamp | undefined) => {
    return ActivityService.getActivitiesByStatus(status, cursor) as any;
}

interface activitysListsProps {
    publishedData: [Activity[], Timestamp | undefined, boolean];
    draftData: [Activity[], Timestamp | undefined, boolean];
    archivedData: [Activity[], Timestamp | undefined, boolean];
    isAdmin: boolean;
}

export function ActivitiesLists({ publishedData, draftData, archivedData, isAdmin }: activitysListsProps) {
    const items = [
        {
            key: 'published',
            label: 'Công khai',
            children: <ActivitiesList
                initData={publishedData[0]}
                initCursor={publishedData[1]}
                initHasMore={publishedData[2]}
                loadData={loadData(ACTIVITY_STATUS.PUBLISHED)}
                isAdmin={isAdmin} />,
            icon: <FolderOpenOutlined />
        },
        {
            key: 'draft',
            label: 'Nháp',
            children: <ActivitiesList
                initData={draftData[0]}
                initCursor={draftData[1]}
                initHasMore={draftData[2]}
                loadData={loadData(ACTIVITY_STATUS.DRAFT)}
                isAdmin={isAdmin} />,
            icon: <PullRequestOutlined />
        },
        {
            key: 'archive',
            label: 'Kho lưu trữ',
            children: <ActivitiesList
                initData={archivedData[0]}
                initCursor={archivedData[1]}
                initHasMore={archivedData[2]}
                loadData={loadData(ACTIVITY_STATUS.ARCHIVED)}
                isAdmin={isAdmin} />,
            icon: <DeploymentUnitOutlined />
        },
    ];

    return (
        <Layout style={{ display: 'flex', position: 'relative' }}>
            <Tabs type="card" items={items} />
            <Link href='/activities/create' style={{ position: 'absolute', right: 0 }}>
                <Button type='primary'>Tạo hoạt động</Button>
            </Link>
        </Layout>
    );
}

export default ActivitiesLists;