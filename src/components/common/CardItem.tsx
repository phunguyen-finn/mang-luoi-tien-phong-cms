import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Card from "antd/es/card";
import List from "antd/es/list";
import Badge from "antd/es/badge";
import Popconfirm from "antd/es/popconfirm";
import Image from "next/image";

export function CardItem({ item, handleDelete, handleEdit }: any) {
    const actions = [
        <EditOutlined key="edit" onClick={handleEdit} />,
        <Popconfirm
            title="Xoá tài nguyên này"
            description="Ban chắc chứ?"
            onConfirm={handleDelete}
            okText="Xác nhận"
            cancelText="Huỷ"
        >
            <DeleteOutlined key="delete" />
        </Popconfirm>
    ];

    return <List.Item key={item.id} >
        <Card
            actions={actions}
            hoverable
            style={{
                width: 250
            }}
            cover={<div className='w-[250px] h-[250px] relative'>
                <Image
                    alt="thumbnail"
                    src={item.thumbnailUrl}
                    layout="fill"
                    objectFit="cover"
                    className="absolute"
                />
            </div>}
        >
            <Card.Meta title={item.name} />

        </Card>
    </List.Item >
}


export default CardItem;