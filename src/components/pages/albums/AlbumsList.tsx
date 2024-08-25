'use client';

import GridList from "@/components/common/GridList";
import AlbumService, { Album } from "@/services/album.service";
import Button from 'antd/es/button';
import Layout from 'antd/es/layout';
import { Timestamp } from "firebase/firestore/lite";
import Link from "next/link";
import { useRouter } from "next/navigation";

const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: 800,
    height: 40,
    justifyContent: 'end',
    marginBottom: 16
}

interface AlbumsListProps {
    initData: Album[];
    initCursor?: Timestamp;
    initHasMore: boolean;
}

export function AlbumsList({ initData, initCursor, initHasMore }: AlbumsListProps) {
    const router = useRouter();

    const handleDelete = (id: string) => {
        return AlbumService.deleteAlbum(id);
    }

    const handleEdit = (id: string) => {
        router.push(`/albums/${id}`)
    }

    const loadData: any = async (cursor?: Timestamp) => {
        const albums = await AlbumService.getAlbums(cursor);
        return [albums[0].map(album => ({
            id: album.id,
            name: album.name,
            thumbnailUrl: album.images[0],
            createdAt: album.createdAt,
        })), albums[1], albums[2]];
    }

    return (
        <Layout>
            <div style={contentStyle}>
                <Link href="/albums/create" style={{ width: 98 }}>
                    <Button type='primary' style={{ position: 'absolute' }}>Tạo album</Button>
                </Link>
            </div>
            <GridList
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                loadData={loadData}
                initCursor={initCursor}
                initHasMore={initHasMore}
                initData={initData.map(album => ({
                    id: album.id,
                    name: album.name,
                    thumbnailUrl: album.images[0],
                    createdAt: album.createdAt,
                }))}
            />
        </Layout>
    );
}

export default AlbumsList;