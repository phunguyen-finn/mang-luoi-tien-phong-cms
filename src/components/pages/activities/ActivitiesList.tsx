'use client';

import { CalendarOutlined, CloudUploadOutlined, UserOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useState } from 'react';
import { Activity } from '@/services/activity.service';
import { Timestamp } from 'firebase/firestore/lite';
import Divider from 'antd/es/divider';
import List from 'antd/es/list';
import Skeleton from 'antd/es/skeleton';
import Space from 'antd/es/space';
import Badge from 'antd/es/badge';
import Link from 'next/link';
import Image from 'next/image';


const scrollableDivStyle = {
    height: 'calc(100vh - 220px)',
    overflow: 'auto',
    padding: '0 16px',
    width: 800,
    border: '1px solid rgba(140, 140, 140, 0.35)',
};

const IconText = ({ icon, text }: any) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const renderItem = (item: Activity) => (
    <List.Item
        key={item.id}
        actions={[
            <IconText
                icon={item.createdBy ? UserOutlined : CalendarOutlined}
                text={item.createdBy ? `Tạo bởi ${item.createdBy}` : `Tạo vào ${item.createdAt.toLocaleString()}`}
                key={item.createdBy ? 'createdBy' : 'createdAt'}
            />
            , <IconText
                icon={CloudUploadOutlined}
                text={`Cập nhật tại ${item.updatedAt.toLocaleString()}`}
                key="updatedAt"
            />
        ]}
        extra={
            <Badge.Ribbon text={item.category}>
                <div className="w-[200px] h-[200px]">
                    <Image
                        alt="thumbnail"
                        src={item.thumbnailUrl}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </Badge.Ribbon>
        }
    >
        <List.Item.Meta
            title={
                <Link href={`/activities/${item.id}`}>
                    {item.title}
                </Link>
            }
        />
        {item.preview}
    </List.Item>
)

interface activitiesListProps {
    loadData: (cursor: Timestamp | undefined) => Promise<[Activity[], Timestamp | undefined, boolean]>;
    initData: Activity[];
    initCursor: Timestamp | undefined;
    initHasMore: boolean;
}

export const ActivitiesList = ({ loadData, initData, initCursor, initHasMore }: activitiesListProps) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initData);
    const [cursor, setCursor] = useState<Timestamp | undefined>(initCursor);
    const [hasMore, setHasMore] = useState(initHasMore);

    const loadMoreData = () => {
        if (loading) return;
        setLoading(true);
        loadData(cursor)
            .then(([activities, cursor, hasMore]) => {
                setData([...data, ...activities]);
                setCursor(cursor);
                setLoading(false);
                setHasMore(hasMore);
            });
    };

    return (
        <div id="scrollableDiv" style={scrollableDivStyle}>
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={hasMore}
                loader={<Skeleton avatar paragraph={{ rows: 3 }} active />}
                endMessage={<Divider plain>Bạn đã tải hết danh sách 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    size="large"
                    itemLayout="vertical"
                    renderItem={renderItem}
                />
            </InfiniteScroll>
        </div>
    );
};

export default ActivitiesList;