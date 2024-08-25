
import PostsLists from '@/components/pages/posts/PostsLists';
import PostService, { POST_STATUS } from '@/services/post.service';

export async function PostsPage() {
    const [publishedData, draftData, archivedData] = await Promise.all([
        PostService.getPostsByStatus(POST_STATUS.PUBLISHED),
        PostService.getPostsByStatus(POST_STATUS.DRAFT),
        PostService.getPostsByStatus(POST_STATUS.ARCHIVED),
    ]);


    return <PostsLists publishedData={publishedData} draftData={draftData} archivedData={archivedData} />
}

export default PostsPage;