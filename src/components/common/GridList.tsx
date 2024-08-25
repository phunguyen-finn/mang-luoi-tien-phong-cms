import App from 'antd/es/app';
import Divider from 'antd/es/divider';
import List from 'antd/es/list';
import Skeleton from 'antd/es/skeleton';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import { Timestamp } from 'firebase/firestore/lite';
import CardItem from './CardItem';

const scrollableDivStyle = {
    height: 'calc(100vh - 220px)',
    overflow: 'auto',
    padding: '0 16px',
    width: 800,
    border: '1px solid rgba(140, 140, 140, 0.35)',
};

interface Item {
    id: string;
    name: string;
    thumbnailUrl: string;
}

interface GridListProps {
    loadData: (cursor?: Timestamp) => Promise<[Item[], Timestamp | undefined, boolean]>;
    handleDelete: (id: string) => Promise<void>;
    handleEdit: (id: string) => void;
    initData: Item[];
    initCursor?: Timestamp;
    initHasMore: boolean;
}

export function GridList({ loadData, handleEdit, handleDelete, initData, initCursor, initHasMore }: GridListProps) {
    const [data, setData] = useState<Item[]>(initData);
    const [cursor, setCursor] = useState<Timestamp | undefined>(initCursor);
    const [hasMore, setHasMore] = useState(initHasMore);
    const { message } = App.useApp();

    const loadMoreData = () => {
        loadData(cursor).then(([items, nextCursor, hasMore]) => {
            setData([...data, ...items]);
            setCursor(nextCursor);
            setHasMore(hasMore);
        });
    };

    const handleDeleteWrapper = (id: string) => {
        handleDelete(id).then(() => {
            message.success("Resource deleted successfully", 5);
            setData([...data.filter((item) => item.id !== id)]);
        }).catch((error) => {
            message.error(error.message, 5);
        })
    }

    const renderItem = (item: Item) => (
        <CardItem key={item.id} item={item} handleDelete={() => handleDeleteWrapper(item.id)} handleEdit={() => handleEdit(item.id)} />
    );

    return (
        <div id="scrollableDiv" style={scrollableDivStyle}>
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={hasMore}
                loader={<Skeleton avatar paragraph={{ rows: 3 }} active />}
                endMessage={<Divider plain>Danh sách đã tải hết 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    grid={{ column: 3, gutter: 10 }}
                    style={{ width: '100%', overflowX: 'hidden', marginTop: '10px' }}
                    dataSource={data}
                    renderItem={renderItem}
                />
            </InfiniteScroll>
        </div>
    );
};

export default GridList;