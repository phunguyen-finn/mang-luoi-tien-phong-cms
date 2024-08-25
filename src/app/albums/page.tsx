import AlbumService from "@/services/album.service";
import AlbumsList from "@/components/pages/albums/AlbumsList";

export async function Page() {
    const [data, cursor, hasMore] = await AlbumService.getAlbums();

    return <AlbumsList initData={data} initCursor={cursor} initHasMore={hasMore} />;
}

export default Page;