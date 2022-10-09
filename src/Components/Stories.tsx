import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../lib/profile";
import { PlusCircleFilled } from "@ant-design/icons";
import AddStoryWidget from "./AddStoryWidget";
import { useEffect, useState } from "react";
import { getUserStories } from "../lib/story";
import { Story } from "../schema/Story";
import { useAuthState } from "../utils/auth";
import StoriesWidget from "./StoriesWidget";

const Stories = () => {
  const { data: profile } = useQuery(["profile", null], getUserProfile, {
    retry: false,
  });
  const { userId } = useAuthState();
  const [addStoryModalOpen, setAddStoryModalOpen] = useState(false);
  const [storiesFromAllUsers, setStoriesFromAllUsers] = useState<any>([]);
  const [currentUserStories, setCurrentUserStories] = useState<any>([]);
  const [showStories, setShowStories] = useState(false);
  const [storiesToShow, setStoriesToShow] = useState<any>([]);
  const { data: stories } = useQuery(["stories"], getUserStories);

  useEffect(() => {
    if (stories) {
      console.log(stories);
      const userStoryMap: Record<string, Story[]> = {};
      stories.forEach((story: Story) => {
        if (userStoryMap[story?.user?._id!]) {
          userStoryMap[story?.user?._id!].push(story);
        } else {
          userStoryMap[story?.user?._id!] = [story];
        }
      });
      const storiesFromCurrentUser = userStoryMap[userId!];
      if (storiesFromCurrentUser) {
        setCurrentUserStories(storiesFromCurrentUser);
        delete userStoryMap[userId!];
      }
      const storiesFromAllUsers = Object.values(userStoryMap);
      console.log(storiesFromAllUsers);
      setStoriesFromAllUsers(storiesFromAllUsers);
    }
  }, [stories]);

  return (
    <div className="stories">
      <div
        className="story"
        style={{
          position: "relative",
        }}
      >
        <img
          src={profile?.user?.profilePicture}
          alt=""
          style={{
            maxHeight: "100%",
            borderRadius: "50%",
            border: "1px solid #d9d9d9",
            cursor: currentUserStories.length > 0 ? "pointer" : "default",
          }}
          onClick={() => {
            if (currentUserStories.length > 0) {
              setShowStories(true);
              setStoriesToShow(currentUserStories);
            }
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "#fff",
            borderRadius: "50%",
          }}
        >
          <PlusCircleFilled
            onClick={() => setAddStoryModalOpen(true)}
            style={{
              fontSize: "1.5rem",
              color: "#7546c9",
              cursor: "pointer",
            }}
          />
        </span>
      </div>
      {storiesFromAllUsers.map((stories: Story[], index: number) => (
        <div className="story" key={index}>
          <img
            src={stories[0]?.user?.profilePicture}
            onClick={() => {
              setStoriesToShow(stories);
              setShowStories(true);
            }}
            alt=""
            style={{
              maxHeight: "100%",
              borderRadius: "50%",
              border: "1px solid #d9d9d9",
              cursor: "pointer",
            }}
          />
        </div>
      ))}
      <StoriesWidget
        modalOpen={showStories}
        stories={storiesToShow}
        onClose={() => setShowStories(false)}
      />
      <AddStoryWidget
        modalOpen={addStoryModalOpen}
        closeModal={() => setAddStoryModalOpen(false)}
      />
    </div>
  );
};

export default Stories;
