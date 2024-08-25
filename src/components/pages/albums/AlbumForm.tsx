'use client';

import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { validateMessages } from "@/constants/index";
import StorageService from "@/services/storage.service";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Upload from "antd/es/upload";
import Button from "antd/es/button";
import Image from "antd/es/image";
import { Album } from "@/services/album.service";

const uploadButton = (
    <button
        style={{
            border: 0,
            background: 'none',
            cursor: 'pointer',
        }}
        type="button"
    >
        <PlusOutlined />
        <div
            style={{
                marginTop: 8,
            }}
        >
            Tải lên
        </div>
    </button>
);

export function AlbumForm({ initialData, onSubmit }: { initialData?: Album, onSubmit: any }) {
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file: any) => {
        if (file.response) setPreviewImage(file.response);
        setPreviewOpen(true);
    };

    const uploadImage = async ({ file, onError, onProgress, onSuccess }: any) => {
        StorageService.upload(file, onProgress, onSuccess, onError);
    }

    const normFile = (e: any) => {
        const urls = e.fileList.map((file: any) => {
            return file.response;
        })
        return urls.filter((url: string) => url);
    }

    return <Form
        form={form}
        validateMessages={validateMessages}
        colon={false}
        labelCol={{ span: 5 }}
        labelAlign='left'
        style={{ width: 800 }}
        onFinish={onSubmit}
        initialValues={initialData}
    >
        <Form.Item
            label='Tên album'
            name='name'
            rules={[{ required: true }, { max: 100 }, { min: 5 }]}
        >
            <Input placeholder="Tên album" />
        </Form.Item>
        <Form.Item
            name="images"
            label="Hình ảnh"
            rules={[{ required: true }]}
            normalize={normFile}
        >
            <Upload
                name="logo"
                listType="picture-card"
                customRequest={uploadImage}
                onPreview={handlePreview}
                multiple
                defaultFileList={initialData
                    ? initialData.images.map((image) => {
                        return {
                            uid: image,
                            name: image,
                            status: 'done',
                            response: image,
                            url: image,
                        }
                    }) : []
                }
            >
                {uploadButton}
            </Upload>
        </Form.Item>
        <Form.Item style={{ display: "flex", width: 800, justifyContent: "end" }}>
            <Button type='primary' htmlType='submit'>
                Xác nhận
            </Button>
        </Form.Item>
        {previewImage && (
            <Image
                wrapperStyle={{
                    display: 'none',
                }}
                preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
            />
        )}
    </Form>;
}

export default AlbumForm;