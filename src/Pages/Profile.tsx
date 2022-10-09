import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Avatar, Button, Col, Divider, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import EditProfileWidget from "../Components/EditProfileWidget";
import PostCard from "../Components/PostCard";
import Spinner from "../Components/Spinner";
import {
  followUserProfile,
  getPostsForUser,
  getUserProfile,
  unfollowUserProfile,
} from "../lib/profile";
import { User } from "../schema/User";
import userRoomsState from "../state/userRooms";
import { useAuthState } from "../utils/auth";

const Profile = () => {
  const [isProfileFromDifferentUser, setIsProfileFromDifferentUser] =
    useState(false);
  const { userId } = useAuthState();
  const queryClient = useQueryClient();
  const [followingUserProfile, setFollowingUserProfile] =
    useState<boolean>(false);
  const [isBeingFollowedByUser, setIsBeingFollowedByUser] =
    useState<boolean>(false);
  const params = useParams();
  const [userData, setUserData] = useState<User>();
  const { status, data } = useQuery(["profile", params.id], getUserProfile, {
    retry: false,
  });
  const { data: userPosts } = useQuery(["posts", params.id], getPostsForUser, {
    retry: false,
  });
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const navigate = useNavigate();
  const [rooms] = useRecoilState(userRoomsState);

  useEffect(() => {
    if (data) {
      setUserData(data.user);
      setFollowingUserProfile(
        data.user.followers.some((user: string) => user === userId)
      );
      setIsBeingFollowedByUser(
        data.user.followings.some((user: string) => user === userId)
      );
    }
  }, [status, data]);

  const sendMessage = () => {
    if (followingUserProfile && isBeingFollowedByUser) {
      const existingRoom = rooms.find((room) =>
        (room.participants as User[]).every(
          (participant: User) =>
            participant._id === userId || participant._id === userData?._id
        )
      );
      if (existingRoom)
        navigate(`/app/messages`, {
          state: {
            roomId: existingRoom!._id,
          },
        });
      else
        navigate(`/app/messages`, {
          state: {
            userId: userData?._id,
          },
        });
    }
  };

  useEffect(() => {
    setIsProfileFromDifferentUser(!!params.id);
  }, [params.id]);

  const toggleFollow = async () => {
    try {
      if (followingUserProfile) await unfollowUserProfile(userData?._id);
      else await followUserProfile(userData?._id);
      queryClient.invalidateQueries(["profile", userData?._id]);
      toast.success(followingUserProfile ? "Unfollowed user" : "Followed user");
    } catch {
      toast.error("Unable to follow user");
    }
  };

  return status !== "success" ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 104px)",
      }}
    >
      {status === "loading" && <Spinner />}
      {status === "error" && (
        <Typography.Text>Profile does not exist</Typography.Text>
      )}
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "0 2rem",
      }}
    >
      <div
        style={{
          border: "1px solid #e8e8e8",
          borderRadius: "50%",
          padding: "5px",
          background: "#fff",
        }}
      >
        <Avatar
          src={userData?.profilePicture}
          size={240}
          style={{
            border: "1px solid #e8e8e8",
          }}
        />
      </div>
      <Typography.Title level={3}>{userData?.username}</Typography.Title>

      {isProfileFromDifferentUser ? (
        <Button
          type="primary"
          style={{
            width: "350px",
          }}
          onClick={toggleFollow}
        >
          {followingUserProfile ? "Unfollow" : "Follow"} User
        </Button>
      ) : (
        <Button
          style={{
            width: "350px",
          }}
          onClick={() => setEditProfileModalOpen(true)}
        >
          Edit Profile
        </Button>
      )}
      {isBeingFollowedByUser && followingUserProfile && (
        <Button
          style={{
            width: "350px",
          }}
          onClick={sendMessage}
        >
          Message
        </Button>
      )}
      <Typography.Text>
        {userData?.followers?.length === 0
          ? `No follower`
          : `${userData?.followers?.length} ${
              (userData?.followers?.length || 0) > 1 ? "followers" : "follower"
            }${followingUserProfile ? ", followed by you" : ""}`}
      </Typography.Text>
      <Typography.Text>
        {userData?.followings?.length === 0
          ? `No following`
          : `${userData?.followings?.length} ${
              (userData?.followings?.length || 0) > 1
                ? "followings"
                : "following"
            }${isBeingFollowedByUser ? ", follows you" : ""}`}
      </Typography.Text>
      <Typography.Text
        style={{
          maxWidth: "350px",
          textAlign: "center",
        }}
      >
        {userData?.bio}
      </Typography.Text>
      <Divider>Posts</Divider>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{
          width: "100%",
          rowGap: "1rem",
        }}
      >
        {(userPosts?.posts.length || 0) === 0 && (
          <Col xs={24}>
            <Typography.Title
              style={{
                textAlign: "center",
              }}
              level={4}
            >
              No posts to show
            </Typography.Title>
          </Col>
        )}
        {userPosts?.posts?.map((post: any, index: number) => (
          <PostCard key={index} post={post} />
        ))}
      </Row>
      <EditProfileWidget
        open={editProfileModalOpen}
        setOpen={setEditProfileModalOpen}
      />
    </div>
  );
};

export default Profile;
