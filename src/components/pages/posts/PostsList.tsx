'use client';

import { CalendarOutlined, CloudUploadOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useState } from 'react';
import PostService, { Post } from '@/services/post.service';
import { Timestamp } from 'firebase/firestore/lite';
import Divider from 'antd/es/divider';
import List from 'antd/es/list';
import Skeleton from 'antd/es/skeleton';
import Space from 'antd/es/space';
import Badge from 'antd/es/badge';
import Link from 'next/link';
import Image from 'next/image';
import { App, Button, Popconfirm } from 'antd';
import { useRouter } from 'next/navigation';


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

interface postsListProps {
    loadData: (cursor: Timestamp | undefined) => Promise<[Post[], Timestamp | undefined, boolean]>;
    initData: Post[];
    initCursor: Timestamp | undefined;
    initHasMore: boolean;
    isAdmin: boolean;
}

export const PostsList = ({ loadData, initData, initCursor, initHasMore, isAdmin }: postsListProps) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initData);
    const [cursor, setCursor] = useState<Timestamp | undefined>(initCursor);
    const [hasMore, setHasMore] = useState(initHasMore);
    const { message } = App.useApp();
    const router = useRouter()

    const loadMoreData = () => {
        if (loading) return;
        setLoading(true);
        loadData(cursor)
            .then(([posts, cursor, hasMore]) => {
                setData([...data, ...posts]);
                setCursor(cursor);
                setLoading(false);
                setHasMore(hasMore);
            });
    };


    const renderItem = (item: Post) => (
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
                    text={`Cập nhật vào ${item.updatedAt.toLocaleString()}`}
                    key="updatedAt"
                />
            ]}
            extra={
                <div className="flex flex-col items-center">
                    <Badge.Ribbon text={item.category} rootClassName='mb-3'>
                        <div className="w-[200px] h-[200px]">
                            <Image
                                alt="thumbnail"
                                src={item.thumbnailUrl}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </Badge.Ribbon>
                    <Popconfirm
                        title="Xoá bài viết"
                        description="Bạn chắc chứ?"
                        onConfirm={() => {
                            message.loading('Xoá bài viết...', 0);
                            PostService.deletePost(item.id).then(() => {
                                message.destroy();
                                message.success('Xoá bài viết thành công!', 5);
                                router.refresh();
                                setData(data.filter((post) => post.id !== item.id));
                            }).catch((error) => {
                                message.destroy();
                                message.error('Xoá bài viết thất bại: ' + error.message, 5);
                            });
                        }}
                        okText="Xác nhận"
                        cancelText="Huỷ"
                    >
                        <Button type='primary' disabled={!isAdmin} danger><DeleteOutlined />Xoá</Button>
                    </Popconfirm>
                </div>
            }
        >
            <List.Item.Meta
                title={
                    <Link href={`/posts/${item.id}`}>
                        {item.title}
                    </Link>
                }
            />
            {item.preview}
        </List.Item>
    );

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

export default PostsList;