'use client';

import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { validateMessages } from "@/constants/index";
import StorageService from "@/services/storage.service";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Upload from "antd/es/upload";
import Button from "antd/es/button";
import Image from "antd/es/image";
import StaticService, { Static } from "@/services/static.service";
import Card from "antd/es/card/Card";
import { App, Divider } from "antd";
import { makeThumbnail } from "@/utils/thumbnail";

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

export function StaticForm({ initialData, isAdmin }: { initialData: Static, isAdmin: boolean }) {
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const { message } = App.useApp();

    const handlePreview = async (file: any) => {
        if (file.response) setPreviewImage(file.response);
        setPreviewOpen(true);
    };

    const uploadImage = async ({ file, onError, onProgress, onSuccess }: any) => {
        StorageService.upload(file, onProgress, onSuccess, onError);
    }

    const uploadThumbnail = async ({ file, onError, onProgress, onSuccess }: any) => {
        const thumbnail = await makeThumbnail(file);
        StorageService.upload(thumbnail, onProgress, onSuccess, onError);
    }

    const normFile = (e: any) => {
        if (e.file.status === 'done')
            return e.file.response;
        return undefined;
    }

    const normFiles = (e: any) => {
        const urls = e.fileList.map((file: any) => {
            return file.response;
        })
        return urls.filter((url: string) => url);
    }

    const onSubmit = (values: any) => {
        message.loading('Đang cập nhật...', 0);
        StaticService.updateStatic(values).then(() => {
            message.destroy();
            message.success('Cập nhật thành công!', 5);
        }).catch((error: any) => {
            message.destroy();
            message.error('Cập nhật thất bại: ' + error.message, 5);
        });
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
            name="partnerLogoUrls"
            label="Logo đối tác"
            rules={[{ required: true }]}
            normalize={normFiles}
        >
            <Upload
                name="logo"
                listType="picture-card"
                customRequest={uploadImage}
                onPreview={handlePreview}
                defaultFileList={initialData
                    ? initialData.partnerLogoUrls.map((image) => {
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
        <Divider />
        <Form.List name="testimonials">
            {(fields, { add, remove }) => (
                <div
                    style={{
                        display: 'flex',
                        rowGap: 16,
                        flexDirection: 'column',
                    }}
                >
                    {fields.map((field, index) => (
                        <Card
                            size="small"
                            title={`Người tham gia ${field.name + 1}`}
                            key={field.key}
                            extra={
                                <CloseOutlined
                                    onClick={() => {
                                        remove(field.name);
                                    }}
                                />
                            }
                        >
                            <Form.Item label="Tên" name={[field.name, 'name']} rules={[{ required: true }]}>
                                <Input placeholder="Tên người tham gia" />
                            </Form.Item>

                            <Form.Item label="Nội dung" name={[field.name, 'content']} rules={[{ required: true }]}>
                                <Input.TextArea placeholder="Nội dung" />
                            </Form.Item>

                            <Form.Item
                                name={[field.name, 'thumbnailUrl']}
                                label="Hình thu nhỏ"
                                normalize={normFile}
                                rules={[{ required: true }]}
                            >
                                <Upload
                                    name="logo"
                                    listType="picture-card"
                                    maxCount={1}
                                    customRequest={uploadThumbnail}
                                    onPreview={handlePreview}
                                    defaultFileList={initialData.testimonials[index]
                                        ? [
                                            {
                                                url: initialData.testimonials[index].thumbnailUrl,
                                                uid: initialData.testimonials[index].thumbnailUrl,
                                                response: initialData.testimonials[index].thumbnailUrl,
                                                name: initialData.testimonials[index].thumbnailUrl,
                                                status: 'done',
                                            }
                                        ] : []
                                    }
                                >
                                    {uploadButton}
                                </Upload>
                            </Form.Item>
                        </Card>
                    ))}

                    <Button type="dashed" onClick={() => add()} block>
                        + Thêm người tham gia
                    </Button>
                </div>
            )}
        </Form.List>
        <Form.Item style={{ display: "flex", width: 800, justifyContent: "end", marginTop: '10px' }}>
            <Button type='primary' htmlType='submit' disabled={!isAdmin}>
                Xác nhận
            </Button>
        </Form.Item>
        {
            previewImage && (
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
            )
        }
    </Form >;
}

export default StaticForm;