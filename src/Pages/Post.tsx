import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Comment,
  Divider,
  Form,
  Input,
  List,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import {
  createCommentOnPost,
  getPostById,
  getPostCommnets,
  likePost,
  unlikePost,
} from "../lib/post";
import { UserOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import moment from "moment";
import { useAuthState } from "../utils/auth";
import { getUserProfile } from "../lib/profile";

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
  <div>
    <Form.Item>
      <Input.TextArea
        value={value}
        placeholder="Add a comment"
        rows={4}
        autoSize={{
          minRows: 4,
          maxRows: 4,
        }}
        onChange={onChange}
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
        style={{
          width: "100%",
        }}
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

const Post = () => {
  const [isLiked, setIsLiked] = useState(false);
  const { userId: currentUserId } = useAuthState();
  const queryClient = useQueryClient();
  const [postData, setPostData] = useState<any>();
  const params = useParams();
  const { data } = useQuery(
    ["post", params.id],
    () => getPostById(params.id!),
    {
      retry: false,
    }
  );
  const { data: commentsData } = useQuery(
    ["comments", params.id],
    () => getPostCommnets(params.id!),
    {
      retry: false,
    }
  );

  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const { data: currentUser } = useQuery(["profile", null], getUserProfile, {
    retry: false,
  });

  useEffect(() => {
    setComments(
      commentsData?.comments.map((comment: any) => ({
        author: comment.user.username,
        avatar: comment.user.profilePicture,
        content: comment.comment,
        datetime: moment(comment.createdAt).fromNow(),
      }))
    );
  }, [commentsData]);

  const addComment = async () => {
    if (!comment) return;
    setAddingComment(true);
    try {
      await createCommentOnPost(params.id!, comment);
      queryClient.invalidateQueries(["comments", params.id]);
      setComment("");
    } catch (err) {
      console.log(err);
    }
    setAddingComment(false);
  };

  useEffect(() => {
    if (data) {
      setPostData(data.post);
      const isLiked = data.post.likes.some(
        (user: string) => user === currentUserId
      );
      setIsLiked(isLiked);
    }
  }, [data]);

  const toggleLike = async () => {
    try {
      if (!isLiked) {
        await likePost(params.id!);
        setPostData((prev: any) => ({
          ...prev,
          likes: [...prev.likes, currentUserId],
        }));
      } else {
        setPostData((prev: any) => ({
          ...prev,
          likes: prev.likes.filter((user: string) => user !== currentUserId),
        }));
        await unlikePost(params.id!);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "0 28%",
      }}
    >
      <div className="post">
        <div className="post-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar src={postData?.user?.profilePicture} />
            &nbsp;&nbsp;
            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
              }}
            >
              <Typography.Text strong>
                {postData?.user?.username}
              </Typography.Text>
              <Typography.Text type="secondary">
                {moment(postData?.createdAt).format("MMMM Do YYYY h:mm a")}
              </Typography.Text>
            </div>
          </div>
        </div>
        <div
          className="post-body"
          style={{
            textAlign: "center",
          }}
        >
          <img alt="" src={postData?.imageUrl} />
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
            {postData?.likes?.length === 0 && (
              <Typography.Text type="secondary">No likes yet</Typography.Text>
            )}
            {postData?.likes?.length > 0 && (
              <Typography.Paragraph style={{ margin: 0 }}>
                {isLiked ? "You " : data?.firstLike?.username}{" "}
                {postData?.likes?.length > 1
                  ? `and ${postData?.likes?.length - 1} other ${
                      postData?.likes?.length - 1 === 1 ? "person" : "people"
                    } liked `
                  : `liked `}
                this
              </Typography.Paragraph>
            )}
          </Space>
          <Typography.Paragraph style={{ margin: "8px 0" }}>
            {postData?.caption ? (
              postData?.caption
            ) : (
              <Typography.Text type="secondary">No caption</Typography.Text>
            )}
          </Typography.Paragraph>
        </div>
      </div>
      <Editor
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onSubmit={addComment}
        submitting={addingComment}
      />
      <List
        id="comments"
        header={`${comments?.length} replies`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
            <Divider />
          </li>
        )}
      />
    </div>
  );
};

export default Post;
