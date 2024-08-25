'use client';

import GridList from "@/components/common/GridList";
import ProductService, { Product } from "@/services/product.service";
import Button from 'antd/es/button';
import Layout from 'antd/es/layout';
import { Timestamp } from "firebase/firestore/lite";
import Link from "next/link";
import { useRouter } from "next/navigation";

const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: 800,
    height: 40,
    justifyContent: 'end',
    marginBottom: 16
}

interface ProductsListProps {
    initData: Product[];
    initCursor?: Timestamp;
    initHasMore: boolean;
}

export function ProductsList({ initData, initCursor, initHasMore }: ProductsListProps) {
    const router = useRouter();

    const handleDelete = (id: string) => {
        return ProductService.deleteProduct(id);
    }

    const handleEdit = (id: string) => {
        router.push(`/products/${id}`)
    }

    const loadData: any = async (cursor?: Timestamp) => {
        const products = await ProductService.getProducts(cursor);
        return [products[0].map(product => ({
            id: product.id,
            name: product.name,
            thumbnailUrl: product.imageUrls[0],
            createdAt: product.createdAt,
        })), products[1], products[2]];
    }

    return (
        <Layout>
            <div style={contentStyle}>
                <Link href="/products/create" style={{ width: 98 }}>
                    <Button type='primary' style={{ position: 'absolute' }}>Tạo sản phẩm</Button>
                </Link>
            </div>
            <GridList
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                loadData={loadData}
                initCursor={initCursor}
                initHasMore={initHasMore}
                initData={initData.map(product => ({
                    id: product.id,
                    name: product.name,
                    thumbnailUrl: product.imageUrls[0],
                    createdAt: product.createdAt,
                }))}
            />
        </Layout>
    );
}

export default ProductsList;