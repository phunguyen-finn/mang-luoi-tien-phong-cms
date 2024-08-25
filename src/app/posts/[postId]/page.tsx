import PostPage from "@/components/pages/posts/PostPage";
import PostService from "@/services/post.service";
import { redirect } from "next/navigation";

export default async function Page({ params: { postId } }: { params: { postId: string } }) {
    const post = await PostService.getPost(postId);

    if (!post) redirect('/posts');

    return <PostPage post={post} />
}