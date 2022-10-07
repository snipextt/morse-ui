import { Avatar, Space } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

interface Props {
  name: string;
  lastMessage?: string;
  lastMessageTime?: moment.Moment;
  profilePicture: string;
  unreadMessageCount?: number;
  onClick?: () => void;
  active?: boolean;
}

const FriendChatCard = ({
  name,
  lastMessage,
  lastMessageTime,
  profilePicture,
  unreadMessageCount,
  active,
  onClick,
}: Props) => {
  const [lastMessageAt, setLastMessageAt] = useState<string>();

  useEffect(() => {
    if (lastMessageTime) {
      setLastMessageAt(moment(lastMessageTime).fromNow());
      let intervelId = setInterval(() => {
        setLastMessageAt(moment(lastMessageTime).fromNow());
      }, 60000);
      return () => {
        clearInterval(intervelId);
      };
    }
  }, []);

  return (
    <div className={`chat-card ${active ? "active" : ""}`} onClick={onClick}>
      <Avatar src={profilePicture} alt={name} />
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{name}</span>
          {lastMessageAt && <span>{lastMessageAt}</span>}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {lastMessage && <span className="last-message">{lastMessage}</span>}
          {!!unreadMessageCount && (
            <span className="last-message-count">
              {unreadMessageCount > 9 ? "9+" : unreadMessageCount}
            </span>
          )}
        </div>
      </Space>
    </div>
  );
};

export default FriendChatCard;
