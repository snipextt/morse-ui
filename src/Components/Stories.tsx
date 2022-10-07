import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../lib/profile";
import { PlusCircleFilled } from "@ant-design/icons";
import AddStoryWidget from "./AddStoryWidget";
import { useState } from "react";

const Stories = () => {
  const { data } = useQuery(["profile", null], getUserProfile, {
    retry: false,
  });

  const [addStoryModalOpen, setAddStoryModalOpen] = useState(false);

  return (
    <div className="stories">
      <div
        className="story"
        style={{
          position: "relative",
        }}
      >
        <img
          src={data?.user?.profilePicture}
          alt=""
          style={{
            maxHeight: "100%",
            borderRadius: "50%",
            border: "1px solid #d9d9d9",
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
      <div className="story"></div>
      <div className="story"></div>
      <div className="story"></div>
      <div className="story"></div>
      <div className="story"></div>
      <div className="story"></div>
      <div className="story"></div>
      <div className="story"></div>
      <div className="story"></div>
      <div className="story"></div>
      <div className="story"></div>
      <div className="story"></div>
      <AddStoryWidget
        modalOpen={addStoryModalOpen}
        closeModal={() => setAddStoryModalOpen(false)}
      />
    </div>
  );
};

export default Stories;
