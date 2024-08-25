
import PostsLists from '@/components/pages/posts/PostsLists';
import PostService, { POST_STATUS } from '@/services/post.service';
import { AUTHORITY } from '@/services/user.service';
import { headers } from 'next/headers';

export default async function PostsPage() {
    const [publishedData, draftData, archivedData] = await Promise.all([
        PostService.getPostsByStatus(POST_STATUS.PUBLISHED),
        PostService.getPostsByStatus(POST_STATUS.DRAFT),
        PostService.getPostsByStatus(POST_STATUS.ARCHIVED),
    ]);
    const user = JSON.parse(headers().get('x-MLTP-Auth') as string);
    const isAdmin = user.authority === AUTHORITY.ADMINISTRATOR;

    return <PostsLists publishedData={publishedData} draftData={draftData} archivedData={archivedData} isAdmin={isAdmin} />
}