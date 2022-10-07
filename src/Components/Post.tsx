import { Avatar, Comment, Divider, Space, Tooltip, Typography } from "antd";
import {
  SendOutlined,
  HeartOutlined,
  HeartFilled,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import PostComment from "./PostComment";
import CommentBoxWidget from "./CommentBoxWidget";

const Post = () => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="post-header">
        <Avatar icon={<UserOutlined />} />
      </div>
      <div className="post-body">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
          alt=""
        />
      </div>
      <div className="post-footer">
        <Space
          size={"small"}
          style={{ display: "flex", alignItems: "flex-start" }}
        >
          {isLiked ? (
            <HeartFilled
              onClick={toggleLike}
              style={{ fontSize: "24px", cursor: "pointer", color: "red" }}
            />
          ) : (
            <HeartOutlined
              onClick={toggleLike}
              style={{ fontSize: "24px", cursor: "pointer" }}
            />
          )}
          <Typography.Paragraph style={{ margin: 0 }}>
            You and 99999 other like this
          </Typography.Paragraph>
        </Space>
        <Typography.Paragraph style={{ margin: "8px 0" }}>
          <span style={{ fontWeight: 500 }}>username</span> Lorem ipsum
        </Typography.Paragraph>
        <Space size={6} style={{ display: "flex", flexWrap: "wrap" }}>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
          <Typography.Link>#tag</Typography.Link>
        </Space>
        <CommentBoxWidget />
        <Typography.Link style={{ margin: "8px 0" }}>
          view all comments
        </Typography.Link>
      </div>
    </div>
  );
};

export default Post;
