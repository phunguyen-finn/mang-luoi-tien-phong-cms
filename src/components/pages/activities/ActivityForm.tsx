'use client';

import { ACTIVITY_STATUS, Activity } from "@/services/activity.service";
import { useRef, useState } from "react";

import Button from "antd/es/button";
import { Checkbox } from "antd";
import Divider from "antd/es/divider";
import { Fira_Sans } from "next/font/google";
import Form from "antd/es/form";
import Image from "antd/es/image";
import Input from "antd/es/input";
import { PlusOutlined } from "@ant-design/icons";
import Radio from "antd/es/radio";
import RichTextEditor from "@/components/common/RichTextEditor";
import Select from "antd/es/select";
import Space from "antd/es/space";
import StorageService from "@/services/storage.service";
import Upload from "antd/es/upload";
import { makeThumbnail } from "@/utils/thumbnail";
import { validateMessages } from "@/constants/index";

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
            Tải hình
        </div>
    </button>
);

const inter = Fira_Sans({
    weight: ['400', '500', '600', '700'],
    subsets: ["latin", "vietnamese"],
});

export function ActivityForm({ initialData, onSubmit, categories, isAdmin }: { initialData?: Activity, onSubmit: any, categories: string[], isAdmin: boolean }) {
    const [form] = Form.useForm();
    const [content, setContent] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const [categoryItems, setCategoryItems] = useState(categories);
    const [name, setName] = useState('');
    const inputRef = useRef<any>(null);
    const onNameChange = (event: any) => {
        setName(event.target.value);
    }

    const addItem = (e: any) => {
        e.preventDefault();
        if (name === '') return;
        setCategoryItems([...categoryItems, name.toLowerCase()]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handlePreview = async (file: any) => {
        if (file.response) setPreviewImage(file);
        else if (file.url) setPreviewImage(file.url);
        setPreviewOpen(true);
    };

    const uploadThumbnail = async ({ file, onError, onProgress, onSuccess }: any) => {
        const thumbnail = await makeThumbnail(file);
        StorageService.upload(thumbnail, onProgress, onSuccess, onError);
    }

    const normFile = (e: any) => {
        if (e.file.status === 'done')
            return e.file.response;
        return undefined;
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
            label='Tiêu để'
            name='title'
            rules={[{ required: true }, { max: 200 }, { min: 10 }]}
        >
            <Input placeholder="Tiêu đề bài viết của bạn là gì?" />
        </Form.Item>
        <Form.Item
            label='Mô tả'
            name='preview'
            rules={[{ required: true }, { min: 50 }]}
        >
            <Input.TextArea showCount maxLength={600} style={{ height: 150 }} placeholder="Mô tả ngắn về bài viết của bạn" />
        </Form.Item>
        <Form.Item label="Danh mục" name="category" rules={[{ required: true }]} >
            <Select
                style={{ width: 300 }}
                placeholder="Danh mục"
                dropdownRender={(menu) => (
                    <>
                        {menu}
                        <Divider
                            style={{
                                margin: '8px 0',
                            }}
                        />
                        <Space
                            style={{
                                padding: '0 8px 4px',
                            }}
                        >
                            <Input
                                placeholder="Danh mục mới"
                                ref={inputRef}
                                value={name}
                                onChange={onNameChange}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                Thêm
                            </Button>
                        </Space>
                    </>
                )}
                options={categoryItems.map((item) => ({
                    label: item,
                    value: item,
                }))}
                rootClassName="capitalize"
            />
        </Form.Item>
        <Form.Item
            label="Nổi bật"
            name="isFeatured"
            valuePropName="checked"
            initialValue={initialData ? initialData.isFeatured : false}
        >
            <Checkbox />
        </Form.Item>
        <Form.Item
            name="thumbnailUrl"
            label="Hình thu nhỏ"
            rules={[{ required: true }]}
            normalize={normFile}
        >
            <Upload
                name="logo"
                listType="picture-card"
                maxCount={1}
                customRequest={uploadThumbnail}
                onPreview={handlePreview}
                defaultFileList={initialData
                    ? [{
                        uid: initialData.thumbnailUrl,
                        url: initialData.thumbnailUrl,
                        name: "thumbnail.jpg",
                        status: "done",
                    }] : []
                }
            >
                {uploadButton}
            </Upload>
        </Form.Item>
        <Form.Item
            style={{ height: '600px' }}
            layout="vertical"
            label="Nội dung"
            name="body"
            required
        >
            <RichTextEditor style={{ height: '500px', margin: 'auto' }} theme="snow" value={content} onChange={setContent} />
        </Form.Item>
        <Form.Item label="Trạng thái" name="status" rules={[{ required: true }]}>
            <Radio.Group>
                <Radio.Button value={ACTIVITY_STATUS.PUBLISHED} disabled={!isAdmin}>Công khai</Radio.Button>
                <Radio.Button value={ACTIVITY_STATUS.DRAFT}>Nháp</Radio.Button>
                <Radio.Button value={ACTIVITY_STATUS.ARCHIVED}>Kho lưu trữ</Radio.Button>
            </Radio.Group>
        </Form.Item>
        <Form.Item style={{ display: "flex", width: 800, justifyContent: "end" }}>
            <Button type='primary' htmlType='submit'>
                Xác nhận
            </Button>
        </Form.Item>
        <Divider />
        <div className="flex flex-col items-center mb-10">
            <h1 className="text-base text-black mb-5">Xem trước</h1>
            <div className="w-11/12 md:w-8/12 lg:w-[700px] block p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h1 className="text-xl md:text-4xl text-black font-bold">{form.getFieldValue("title")}</h1>
                <p className="text-sm md:text-sm text-black text-gray-600 italic mb-5 mt-2">{form.getFieldValue("preview")}</p>
                <Divider />
                <div className={`${inter.className} text-base`} dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
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

export default ActivityForm;