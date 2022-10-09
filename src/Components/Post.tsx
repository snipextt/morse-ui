import { Avatar, Comment, Divider, Space, Tooltip, Typography } from "antd";
import {
  SendOutlined,
  HeartOutlined,
  HeartFilled,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import PostComment from "./PostComment";
import CommentBoxWidget from "./CommentBoxWidget";
import { useAuthState } from "../utils/auth";
import moment from "moment";
import { Link } from "react-router-dom";

const Post = ({ imageUrl, _id, user, likes, createdAt, caption }: any) => {
  const { userId } = useAuthState();
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsLiked(likes.some((like: string) => like === userId));
  }, []);

  return (
    <div className="post">
      <div className="post-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar src={user?.profilePicture} />
          &nbsp;&nbsp;
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
            }}
          >
            <Typography.Text strong>{user?.username}</Typography.Text>
            <Typography.Text type="secondary">
              {moment(createdAt).format("MMMM Do YYYY h:mm a")}
            </Typography.Text>
          </div>
        </div>
      </div>
      <div className="post-body">
        <img src={imageUrl} alt="" />
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
          {likes?.length === 0 && (
            <Typography.Text type="secondary">No likes yet</Typography.Text>
          )}
          {likes?.length > 0 && (
            <Typography.Paragraph style={{ margin: 0 }}>
              {isLiked ? "You " : ""}{" "}
              {likes?.length > 1
                ? `${likes?.length - 1} ${
                    likes?.length - 1 === 1 ? "person" : "people"
                  } liked `
                : `liked `}
              this
            </Typography.Paragraph>
          )}
        </Space>
        <Typography.Paragraph style={{ margin: "8px 0" }}>
          {caption}
        </Typography.Paragraph>
        <CommentBoxWidget postId={_id} />
        <Typography.Link style={{ margin: "8px 0" }}>
          <Link to={`/app/post/${_id}#comments`}>view all comments</Link>
        </Typography.Link>
      </div>
    </div>
  );
};

export default Post;
