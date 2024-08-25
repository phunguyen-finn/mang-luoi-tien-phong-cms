import PostPage from "@/components/pages/posts/PostPage";
import PostService from "@/services/post.service";
import { AUTHORITY } from "@/services/user.service";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ params: { postId } }: { params: { postId: string } }) {
    const post = await PostService.getPost(postId);

    if (!post) redirect('/posts');

    const user = JSON.parse(headers().get('x-MLTP-Auth') as string);
    const isAdmin = user.authority === AUTHORITY.ADMINISTRATOR;
    return <PostPage isAdmin={isAdmin} />
}