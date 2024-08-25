import PostPage from "@/components/pages/posts/PostPage";
import { AUTHORITY } from "@/services/user.service";
import { headers } from "next/headers";

export default async function Page() {
    const user = JSON.parse(headers().get('x-MLTP-Auth') as string);
    const isAdmin = user.authority === AUTHORITY.ADMINISTRATOR;
    return <PostPage isAdmin={isAdmin} />
}