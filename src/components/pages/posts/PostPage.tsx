'use client';

import PostService, { Post } from "@/services/post.service";
import PostForm from "./PostForm";
import Layout from "antd/es/layout";
import Breadcrumb from "antd/es/breadcrumb";
import App from "antd/es/app";
import { useRouter } from "next/navigation";
import Link from "next/link";

const layoutStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    marginBottom: '10px'
}

export function PostPage({ post, isAdmin }: { post?: Post, isAdmin: boolean }) {
    const router = useRouter();
    const { message } = App.useApp();

    const handleUpdate = (_post: any) => {
        if (post) {
            message.loading('Cập nhật bài viết ...', 0);
            PostService.updatePost(post.id, _post).then(() => {
                message.destroy();
                message.success('Cập nhật bài viết thành công!', 5);
                router.push('/posts');
            }).catch((error) => {
                message.destroy();
                message.error('Cập nhật bài viết thất bại: ' + error.message, 5);
            });
        }
    }

    const handleCreate = (post: any) => {
        message.loading('Tạo bài viết..', 0);
        PostService.createPost(post).then(() => {
            message.destroy();
            message.success('Tạo bài viết thành công!', 5);
            router.push('/posts');
        }).catch((error) => {
            message.destroy();
            message.error('Tạo bài viết thất bại ' + error.message, 5);
        });
    }

    return (
        <Layout style={layoutStyle}>
            <Layout>
                <Breadcrumb style={{ marginBottom: 10 }}>
                    <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item><Link href="/posts">Bài viết</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{post ? post.title : 'Tạo bài viết'}</Breadcrumb.Item>
                </Breadcrumb>
                <PostForm initialData={post} onSubmit={post ? handleUpdate : handleCreate} isAdmin={isAdmin} />
            </Layout>
        </Layout >
    );
}

export default PostPage;