'use client';

import { DeploymentUnitOutlined, FolderOpenOutlined, PullRequestOutlined } from "@ant-design/icons";
import { Timestamp } from "firebase/firestore/lite";
import PostService, { Post, POST_STATUS } from "@/services/post.service";
import PostsList from "./PostsList";
import Button from 'antd/es/button';
import Layout from 'antd/es/layout';
import Tabs from 'antd/es/tabs';
import Link from "next/link";

const loadData = (status: POST_STATUS) => (cursor: Timestamp | undefined) => {
    return PostService.getPostsByStatus(status, cursor) as any;
}

interface postsListsProps {
    publishedData: [Post[], Timestamp | undefined, boolean];
    draftData: [Post[], Timestamp | undefined, boolean];
    archivedData: [Post[], Timestamp | undefined, boolean];
}

export function PostsLists({ publishedData, draftData, archivedData }: postsListsProps) {
    const items = [
        {
            key: 'published',
            label: 'Công khai',
            children: <PostsList
                initData={publishedData[0]}
                initCursor={publishedData[1]}
                initHasMore={publishedData[2]}
                loadData={loadData(POST_STATUS.PUBLISHED)} />,
            icon: <FolderOpenOutlined />
        },
        {
            key: 'draft',
            label: 'Nháp',
            children: <PostsList
                initData={draftData[0]}
                initCursor={draftData[1]}
                initHasMore={draftData[2]}
                loadData={loadData(POST_STATUS.DRAFT)} />,
            icon: <PullRequestOutlined />
        },
        {
            key: 'archive',
            label: 'Kho lưu trữ',
            children: <PostsList
                initData={archivedData[0]}
                initCursor={archivedData[1]}
                initHasMore={archivedData[2]}
                loadData={loadData(POST_STATUS.ARCHIVED)} />,
            icon: <DeploymentUnitOutlined />
        },
    ];

    return (
        <Layout style={{ display: 'flex', position: 'relative' }}>
            <Tabs type="card" items={items} />
            <Link href='/posts/create' style={{ position: 'absolute', right: 0 }}>
                <Button type='primary'>Tạo bài viết</Button>
            </Link>
        </Layout>
    );
}

export default PostsLists;