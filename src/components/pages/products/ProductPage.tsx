'use client';

import { ProductForm } from "./ProductForm";
import Layout from "antd/es/layout";
import Breadcrumb from "antd/es/breadcrumb";
import App from "antd/es/app";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductService, { Product } from "@/services/product.service";

const layoutStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
}

export function ProductPage({ product }: { product?: Product }) {
    const router = useRouter();
    const { message } = App.useApp();

    const handleUpdate = (_product: any) => {
        if (product) {
            message.loading('Cập nhật sản phẩm...', 0);
            ProductService.updateProduct(product.id, _product).then(() => {
                message.destroy();
                message.success('Cập nhật sản phẩm thành công', 5);
                router.push("/products");
            }).catch((error) => {
                message.destroy();
                message.error('Cập nhật sản phẩm thất bại: ' + error.message, 5);
            });
        }
    }

    const handleCreate = (pattern: any) => {
        message.loading('Tạo sản phẩm...', 0);
        ProductService.createProduct(pattern).then(() => {
            message.destroy();
            message.success('Tạo sản phẩm thành công', 5);
            router.push("/products");
        }).catch((error) => {
            message.destroy();
            message.error('Tạo sản phẩm thất bại: ' + error.message, 5);
        });
    }
    return (
        <Layout style={layoutStyle}>
            <Layout>
                <Breadcrumb style={{ marginBottom: 10 }}>
                    <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item><Link href="/products">Sản phẩm</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{product ? product.name : "Tạo sản phẩm"}</Breadcrumb.Item>
                </Breadcrumb>
                <ProductForm
                    initialData={product}
                    onSubmit={product ? handleUpdate : handleCreate}
                />
            </Layout>
        </Layout >
    );
}

export default ProductPage;