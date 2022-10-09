import { Col } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }: any) => {
  const [isBeingHovered, setIsBeingHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <Col
      xs={24}
      md={12}
      lg={8}
      xxl={6}
      onClick={() => navigate(`/app/post/${post._id}`)}
      style={{
        position: "relative",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsBeingHovered(true)}
      onMouseLeave={() => setIsBeingHovered(false)}
    >
      {isBeingHovered && (
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            zIndex: 1,
            background: "rgba(0,0,0,0.5)",
            color: "#fff",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
          }}
        >
          <HeartFilled
            style={{
              marginRight: "0.5rem",
            }}
          />
          {post.likes.length}
        </div>
      )}
      <img
        src={post.imageUrl}
        style={{
          maxWidth: "100%",
          minHeight: "100%",
          objectFit: "cover",
        }}
        alt=""
      />
    </Col>
  );
};

export default PostCard;
