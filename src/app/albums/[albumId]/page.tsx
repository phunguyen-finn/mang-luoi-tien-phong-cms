import AlbumPage from "@/components/pages/albums/AlbumPage";
import AlbumService from "@/services/album.service";
import { redirect } from "next/navigation";

export default async function Page({ params: { albumId } }: { params: { albumId: string } }) {
    const album = await AlbumService.getAlbum(albumId);

    if (!album) redirect('/album');

    return <AlbumPage album={album} />
}