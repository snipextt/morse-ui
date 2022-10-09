import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../Components/Post";
import Spinner from "../Components/Spinner";
import Stories from "../Components/Stories";
import { getfeedForCurrentUser, getUserProfile } from "../lib/profile";

const Home = () => {
  const { data } = useQuery(["feed"], getfeedForCurrentUser, {
    retry: false,
  });
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setPosts(data.posts);
    }
  }, [data]);

  return (
    <div className="feed">
      {status === "loading" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "700px",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          <Stories />
          {posts.map((post) => (
            <Post key={post._id} {...post} />
          ))}
          {posts.length === 0 && (
            <Typography.Text
              style={{
                textAlign: "center",
                display: "block",
                marginTop: "70px",
                fontSize: "20px",
              }}
            >
              posts from people you follow will appear here
            </Typography.Text>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
