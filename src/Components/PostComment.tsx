import {
  Avatar,
  Button,
  Comment,
  Divider,
  Form,
  Input,
  Mentions,
  Tooltip,
} from "antd";
import { useState } from "react";
import {
  SendOutlined,
  HeartOutlined,
  HeartFilled,
  UserOutlined,
} from "@ant-design/icons";

const { Option } = Mentions;

interface CommentActionProps {
  likesCount: number;
  toggleLikeComment: () => void;
  showReplyEditor: () => void;
  showAddReplyText: boolean;
  isCommentLiked: boolean;
}

const CommentAction = ({
  toggleLikeComment,
  showReplyEditor,
  likesCount,
  showAddReplyText,
  isCommentLiked,
}: CommentActionProps) => {
  return (
    <>
      {isCommentLiked ? (
        <HeartFilled
          style={{ marginRight: "2px", color: "red" }}
          onClick={toggleLikeComment}
        />
      ) : (
        <HeartOutlined
          style={{ marginRight: "2px" }}
          onClick={toggleLikeComment}
        />
      )}{" "}
      <span>{likesCount} Likes</span>
      {showAddReplyText && (
        <span onClick={showReplyEditor} key="comment-basic-reply-to">
          Reply
        </span>
      )}
    </>
  );
};

const PostComment = () => {
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showAddReplyText, setShowAddReplyText] = useState(true);
  const [isCommentLiked, setIsCommentLiked] = useState(false);

  const orignalLikeCount = 0;

  const toggleLikeComment = () => {
    setIsCommentLiked(!isCommentLiked);
    setLikesCount((prevCount) =>
      isCommentLiked ? orignalLikeCount : orignalLikeCount + 1
    );
  };

  const toggleReplyEditor = () => {
    setShowReplyEditor(true);
    setShowAddReplyText(false);
  };

  const handleSubmit = () => {
    if (!value) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue("");
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Comment
        author={<a>Han Solo</a>}
        actions={[
          <CommentAction
            isCommentLiked={isCommentLiked}
            toggleLikeComment={toggleLikeComment}
            likesCount={likesCount}
            showReplyEditor={toggleReplyEditor}
            showAddReplyText={showAddReplyText}
          />,
        ]}
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <>
            <p>
              We supply a series of design principles, practical patterns and
              high quality design resources (Sketch and Axure), to help people
              create their product prototypes beautifully and efficiently.
            </p>
          </>
        }
        datetime={
          <Tooltip title="2016-11-22 11:22:33">
            <span>8 hours ago</span>
          </Tooltip>
        }
      />
      <Divider style={{ margin: "5px 0 10px 0" }} />
    </>
  );
};

export default PostComment;
