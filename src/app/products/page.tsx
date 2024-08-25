import ProductService from "@/services/product.service";
import ProductsList from "@/components/pages/products/ProductsList";

export async function Page() {
    const [data, cursor, hasMore] = await ProductService.getProducts();

    return <ProductsList initData={data} initCursor={cursor} initHasMore={hasMore} />;
}

export default Page;