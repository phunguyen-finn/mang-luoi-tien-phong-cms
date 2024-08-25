import ProductPage from "@/components/pages/products/ProductPage";
import ProductService from "@/services/product.service";
import { redirect } from "next/navigation";

export default async function Page({ params: { productId } }: { params: { productId: string } }) {
    const product = await ProductService.getProduct(productId);

    if (!product) redirect('/product');

    return <ProductPage product={product} />
}