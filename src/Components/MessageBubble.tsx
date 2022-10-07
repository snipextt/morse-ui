import React, { useEffect, useRef } from "react";
import { markMessageAsRead } from "../lib/socket-io";
import { Message } from "../schema/Message";
import { useAuthState } from "../utils/auth";
import { CheckCircleOutlined } from "@ant-design/icons";

const MessageBubble = ({ message, createdAt, user, _id, readBy }: Message) => {
  const { userId: currentUserId } = useAuthState();
  const messgaeContainerRef = useRef<HTMLDivElement>(null);
  const { userId } = useAuthState();

  useEffect(() => {
    if (messgaeContainerRef.current) {
      messgaeContainerRef.current.scrollIntoView({ behavior: "smooth" });
      const intersectionObserver = new IntersectionObserver(
        () => {
          if ((user as any) !== userId) {
            markMessageAsRead(_id);
          }
          if (messgaeContainerRef.current)
            intersectionObserver.unobserve(messgaeContainerRef.current!);
        },
        {
          root: document.querySelector("chat-body"),
        }
      );
      intersectionObserver.observe(messgaeContainerRef.current!);
    }
  }, [messgaeContainerRef.current]);

  return (
    <>
      <div
        ref={messgaeContainerRef}
        className={
          "speech-bubble " +
          (currentUserId === (user as any) ? "current-user" : "")
        }
      >
        <span>{message}</span>
      </div>
      {(user as any) === userId && readBy.length === 2 && (
        <div className="read-by">Read</div>
      )}
    </>
  );
};

export default MessageBubble;
