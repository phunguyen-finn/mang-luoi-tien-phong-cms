'use client';

import { Form, Input, Button, Radio } from "antd";
import { validateMessages } from "@/constants/index";

export function AccountForm({ onSubmit }: { onSubmit: any }) {
    return <Form
        validateMessages={validateMessages}
        colon={false}
        labelCol={{ span: 5 }}
        labelAlign='left'
        style={{ width: 800 }}
        onFinish={onSubmit}
    >
        <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, type: "email" }]}
        >
            <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
            label='Mật khẩu'
            name='password'
            rules={[{ required: true }, { min: 8 }]}
        >
            <Input.Password placeholder="Mật khẩu" />
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
                Confirm
            </Button>
        </Form.Item>
    </Form>;
}

export default AccountForm;