'use client';

import { Form, Input, Button, Radio } from "antd";
import { validateMessages } from "@/constants/index";

export function AccountEditForm({ onSubmit, user }: any) {
    return <Form
        validateMessages={validateMessages}
        colon={false}
        labelCol={{ span: 5 }}
        labelAlign='left'
        style={{ width: 800 }}
        onFinish={onSubmit}
        initialValues={user}
    >
        <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, type: "email" }]}
        >
            <Input placeholder="Email" disabled />
        </Form.Item>
        <Form.Item
            label='Tên hiển thị'
            name='displayName'
            rules={[{ required: true }]}
        >
            <Input placeholder="Tên hiển thị" />
        </Form.Item>
        <Form.Item
            label='Quyền hạn'
            name='authority'
            rules={[{ required: true }]}
        >
            <Radio.Group>
                <Radio.Button value="ADMINISTRATOR">Admin</Radio.Button>
                <Radio.Button value="MODERATOR">Mod</Radio.Button>
            </Radio.Group>
        </Form.Item>
        <Form.Item style={{ display: "flex", width: 800, justifyContent: "end" }}>
            <Button type='primary' htmlType='submit'>
                Xác nhận
            </Button>
        </Form.Item>
    </Form>;
}

export default AccountEditForm;