import { Avatar, Comment, List } from "antd";
import { useState } from "react";
import Editor from "./Editor";
import moment from "moment";

interface CommentItem {
  author: string;
  avatar: string;
  content: React.ReactNode;
  datetime: string;
}

const CommentList = ({ comments }: { comments: CommentItem[] }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const CommentBoxWidget = () => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState<string>("");
  const handleChange = (e: any) => {
    setValue(e);
  };
  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setComments((prevComments) => [
      {
        author: "Han Solo",
        avatar: "https://joeschmoe.io/api/v1/random",
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
