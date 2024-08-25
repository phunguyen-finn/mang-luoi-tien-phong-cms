'use client';

import AlbumForm from "./AlbumForm";
import Layout from "antd/es/layout";
import Breadcrumb from "antd/es/breadcrumb";
import App from "antd/es/app";
import { useRouter } from "next/navigation";
import AlbumService, { Album } from "@/services/album.service";
import Link from "next/link";

const layoutStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
}

export function AlbumPage({ album }: { album?: Album }) {
    const router = useRouter();
    const { message } = App.useApp();

    const handleUpdate = (_album: any) => {
        if (album) {
            message.loading('Cập nhật album...', 0);
            AlbumService.updateAlbum(album.id, _album).then(() => {
                message.destroy();
                message.success('Cập nhật album thành công', 5);
                router.push("/albums");
            }).catch((error) => {
                message.destroy();
                message.error('Cập nhật album thất bại: ' + error.message, 5);
            });
        }
    }

    const handleCreate = (album: any) => {
        console.log(album);
        message.loading('Tạo album...', 0);
        AlbumService.createAlbum(album).then(() => {
            message.destroy();
            message.success('Tạo album thành công', 5);
            router.push("/albums");
        }).catch((error) => {
            message.destroy();
            message.error('Tạo album thất bại: ' + error.message, 5);
        });
    }
    return (
        <Layout style={layoutStyle}>
            <Layout>
                <Breadcrumb style={{ marginBottom: 10 }}>
                    <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item><Link href="/albums">Albums</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{album ? album.name : "Tạo album"}</Breadcrumb.Item>
                </Breadcrumb>
                <AlbumForm
                    initialData={album}
                    onSubmit={album ? handleUpdate : handleCreate}
                />
            </Layout>
        </Layout >
    );
}

export default AlbumPage;