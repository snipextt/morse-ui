import { Avatar, Comment, List } from "antd";
import { useState } from "react";
import Editor from "./Editor";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../lib/profile";
import { createCommentOnPost } from "../lib/post";

interface CommentItem {
  author: string;
  avatar: string;
  content: React.ReactNode;
  datetime: string;
}

const CommentList = ({ comments }: { comments: CommentItem[] }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const CommentBoxWidget = ({ postId }: any) => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const { data } = useQuery(["profile", null], getUserProfile, {
    retry: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState<string>("");
  const handleChange = (e: any) => {
    setValue(e);
  };
  const handleSubmit = async () => {
    if (!value) return;
    setSubmitting(true);
    await createCommentOnPost(postId, value);
    setComments((prevComments) => [
      {
        author: data.user.username,
        avatar: data.user.profilePicture,
        content: <p>{value}</p>,
        datetime: moment().fromNow(),
      },
      ...prevComments,
    ]);
    setValue("");
    setSubmitting(false);
  };

  return (
    <div style={{ width: "100%" }}>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        style={{ width: "100%" }}
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </div>
  );
};

export default CommentBoxWidget;
