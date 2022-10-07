import { Avatar, Button, Input, Layout, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import FriendChatCard from "../Components/FriendChatCard";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import userRoomsState from "../state/userRooms";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../lib/profile";
import EmptyChatImage from "../assets/25540.jpg";
import Spinner from "../Components/Spinner";
import { SendOutlined } from "@ant-design/icons";
import { getRoomMessages, messageCreate } from "../lib/socket-io";
import { useAuthState } from "../utils/auth";
import { Message } from "../schema/Message";
import { User } from "../schema/User";
import { Room } from "../schema/Room";
import messagesState from "../state/messages";
import MessageBubble from "../Components/MessageBubble";

const { Content, Sider } = Layout;

interface RoomProps {
  name: string;
  lastMessage?: string;
  lastMessageTime?: moment.Moment;
  profilePicture: string;
  unreadMessageCount?: number;
  onClick?: () => void;
  active?: boolean;
  orignalRoomIndex?: number;
  roomId?: string;
}

const Messages = () => {
  const [messageInputValue, setMessageInputValue] = useState("");
  const [rooms] = useRecoilState(userRoomsState);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const { userId: currentUserId } = useAuthState();
  const [userId, setUserId] = useState("");
  const [isNewRoom, setIsNewRoom] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room>();
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [selectedRoomMessages, setSelectedRoomMessages] = useState<Message[]>();
  const [newChatuser, setNewChatUser] = useState<RoomProps | undefined>(
    undefined
  );
  const [newChatuserSelected, setNewChatUserSelected] = useState(false);
  const [messages, setMessages] = useRecoilState(messagesState);

  const { data: userData, status } = useQuery(
    ["profile", userId || null],
    getUserProfile
  );
  const location = useLocation();
  const [chatUsers, setChatUsers] = useState<RoomProps[]>([]);

  const handleSendMessage = () => {
    if (!messageInputValue) return;
    messageCreate(
      messageInputValue,
      selectedRoom?._id,
      userId ||
        (selectedRoom?.participants as User[]).find(
          (participant: User) => participant._id !== currentUserId
        )?._id
    );
    if (userId) {
      setNewChatUser(undefined);
      setNewChatUserSelected(false);
      setSelectedRoomIndex(-1);
    }
    setMessageInputValue("");
  };

  const handleRoomChange = (
    orignalRoomIndex: number,
    index: number,
    isNewChatUser?: boolean
  ) => {
    if (isNewChatUser) {
      setNewChatUserSelected(true);
      return;
    }
    setSelectedRoomIndex(index);
    setSelectedRoom(rooms[orignalRoomIndex]);
  };

  useEffect(() => {
    if (location.state) {
      const isExistingRoom = !!location.state.roomId;
      if (!isExistingRoom) {
        setUserId(location.state.userId);
        setIsNewRoom(true);
      } else {
        const selectedRoomIndex = rooms.findIndex(
          (room) => room._id === location.state.roomId
        );
        if (selectedRoomIndex !== -1) {
          setSelectedRoom(rooms[selectedRoomIndex]);
          setSelectedRoomIndex(
            chatUsers.findIndex(
              (chatUser) => chatUser.orignalRoomIndex === selectedRoomIndex
            )
          );
        }
      }
    } else {
      setSelectedRoomIndex(-1);
    }
    return () => {
      history.replaceState(null, "");
    };
  }, [location.state, chatUsers.length]);

  useEffect(() => {
    if (rooms.length) {
      const existingRooms = Array.from(rooms).map((room, index) => ({
        ...room,
        originalIndex: index,
      }));
      existingRooms.sort(
        (a, b) =>
          new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()
      );
      const newChatUsers = existingRooms.map((room) => {
        const otherUser = room.participants.find(
          (participant) => (participant as User)._id !== currentUserId
        );
        const lastMessage = room.lastTenMessages?.slice(-1)[0] as Message;
        let unreadCount = 0;
        console.log(room.lastTenMessages);
        for (let i = room.lastTenMessages?.length - 1; i >= 0; i--) {
          if (
            (room.lastTenMessages[i] as Message).readBy.includes(currentUserId!)
          ) {
            break;
          }
          unreadCount++;
        }
        return {
          name: (otherUser as User).name!,
          lastMessage: lastMessage?.message,
          lastMessageTime: moment(lastMessage?.createdAt),
          profilePicture: (otherUser as User).profilePicture!,
          unreadMessageCount: unreadCount,
          orignalRoomIndex: room.originalIndex,
          roomId: room._id,
        };
      });
      console.log(rooms);
      if (selectedRoom) {
        const selectedChatUserIndex = selectedRoomIndex;
        const selctedChatUser = chatUsers[selectedChatUserIndex];
        const newSlectedChatUserIndex = newChatUsers.findIndex(
          (chatUser) => chatUser.roomId === selctedChatUser?.roomId
        );
        setSelectedRoomIndex(newSlectedChatUserIndex);
      }
      setChatUsers(newChatUsers);
    }
  }, [rooms]);

  useEffect(() => {
    if (userData && isNewRoom) {
      setNewChatUser(() => ({
        name: userData.user.name,
        profilePicture: userData.user.profilePicture,
      }));
      setNewChatUserSelected(true);
    }
  }, [userData]);

  useEffect(() => {
    if (selectedRoom) {
      const roomMessages = selectedRoom?.lastTenMessages as Message[];
      const roomMessagesFromState = messages[selectedRoom?._id!];
      if (!roomMessagesFromState?.initialLoad) {
        setMessagesLoading(true);
        getRoomMessages(selectedRoom?._id!);
        setSelectedRoomMessages(roomMessages);
      } else {
        setSelectedRoomMessages(roomMessagesFromState.messages);
      }
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (selectedRoom) {
      const roomMessagesFromState = messages[selectedRoom?._id!];
      setSelectedRoomMessages(roomMessagesFromState?.messages);
      setMessagesLoading(false);
    } else {
      setSelectedRoomMessages(undefined);
    }
  }, [messages]);

  return (
    <Content
      style={{
        padding: "0 20px",
        height: "calc(100vh - 104px)",
      }}
    >
      <Layout
        className="site-layout-background"
        style={{ height: "100%", border: "1px solid #e6e6e6" }}
      >
        <Sider
          className="site-layout-background"
          width={300}
          style={{
            borderRight: "1px solid #f0f0f0",
          }}
        >
          {newChatuser && (
            <FriendChatCard
              name={newChatuser.name}
              profilePicture={newChatuser.profilePicture}
              onClick={() => handleRoomChange(-1, 0, true)}
              active={newChatuserSelected}
            />
          )}
          {chatUsers.map((item, index) => (
            <FriendChatCard
              onClick={() => handleRoomChange(item.orignalRoomIndex!, index)}
              key={index}
              active={selectedRoomIndex === index && !newChatuserSelected}
              {...item}
            />
          ))}
        </Sider>
        <Content style={{ height: "100%" }}>
          {selectedRoomIndex === -1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexDirection: "column",
              }}
            >
              <img
                src={EmptyChatImage}
                style={{
                  maxHeight: "400px",
                }}
                alt="chat"
              />
              <Typography.Title level={5}>
                Select user to start chatting
              </Typography.Title>
            </div>
          )}
          {selectedRoomIndex >= 0 &&
            (status === "success" ? (
              <div
                style={{
                  height: "100%",
                }}
              >
                <div className="chat-header">
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <Typography.Text style={{ margin: 0, marginLeft: "5px" }}>
                      {newChatuserSelected
                        ? newChatuser?.name
                        : chatUsers[selectedRoomIndex]?.name}
                    </Typography.Text>
                  </div>
                </div>
                <div className="chat-body">
                  {selectedRoomMessages?.map((message, index) => (
                    <MessageBubble {...message} key={message._id} />
                  ))}
                </div>
                <div className="chat-footer">
                  <Input
                    size="large"
                    placeholder="Type your message here"
                    value={messageInputValue}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    onChange={(e) => setMessageInputValue(e.target.value)}
                    suffix={
                      <Button type="primary" onClick={handleSendMessage}>
                        <SendOutlined />
                      </Button>
                    }
                  />
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  flexDirection: "column",
                }}
              >
                <Spinner />
              </div>
            ))}
        </Content>
      </Layout>
    </Content>
  );
};

export default Messages;
