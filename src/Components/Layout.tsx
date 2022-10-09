import { Space } from "antd";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { createSocketConnection, getAllRooms } from "../lib/socket-io";
import { useAuthState } from "../utils/auth";
import Header from "./Header";
import { useRecoilState } from "recoil";
import userRoomsState from "../state/userRooms";
import { Socket } from "socket.io-client";
import { SocketEvents } from "../constants";
import messagesState from "../state/messages";
import { Message } from "../schema/Message";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../lib/profile";

const Layout = () => {
  const { token } = useAuthState();
  const navigate = useNavigate();
  const [rooms, setRooms] = useRecoilState(userRoomsState);
  const [messages, setMessages] = useRecoilState(messagesState);
  const { status, data: userData } = useQuery(
    ["profile", null],
    getUserProfile
  );

  useEffect(() => {
    if (!token) navigate("/login");
    else {
      createSocketConnection().then(async (io: any) => {
        const rooms = await getAllRooms();
        setRooms(rooms);
        const messages: any = {};
        rooms.forEach((room: any) => {
          messages[room._id] = {
            messages: [],
            initialLoad: false,
          };
        });
        setMessages(messages);
        io?.on(SocketEvents.MESSAGE_CREATE, (message: Message) => {
          if (messages[message.room as any]) {
            setMessages((messages) => ({
              ...messages,
              [message.room as any]: {
                messages: [...messages[message.room as any].messages, message],
                initialLoad: messages[message.room as any].initialLoad,
              },
            }));
            const messageRoom = rooms.find((room) => room._id === message.room);
            if (messageRoom) {
              setRooms((rooms) => {
                try {
                  const newRooms = Array.from(rooms);
                  const room = Object.assign({}, messageRoom);
                  newRooms.splice(
                    newRooms.findIndex((r) => r._id === room._id),
                    1
                  );
                  room.lastTenMessages = Array.from(room.lastTenMessages);
                  room.lastTenMessages.push(message);
                  console.log(room.lastTenMessages, "last 10 room messages");
                  room.updatedAt = message.createdAt;
                  newRooms.unshift(room);
                  return newRooms;
                } catch (error) {
                  console.log(error);
                  return rooms;
                }
              });
            }
          } else {
            setMessages((messages) => ({
              ...messages,
              [message.room as any]: {
                messages: [message],
                initialLoad: false,
              },
            }));
            setRooms((rooms) => [
              ...rooms,
              {
                _id: message.room as any,
                participants: message.participants,
                lastTenMessages: [message],
                attachments: [],
                isArchived: false,
                createdAt: message.createdAt,
                updatedAt: message.updatedAt,
              },
            ]);
          }
        });
        io?.on(SocketEvents.GET_ROOM_MESSAGES, (messages: Message[]) => {
          setMessages((prevMessages) => ({
            ...prevMessages,
            [messages[0].room as any]: {
              messages,
              initialLoad: true,
            },
          }));
        });
        io?.on(SocketEvents.MESSAGE_READ, (message: Message) => {
          setMessages((messages) => ({
            ...messages,
            [message.room as any]: {
              messages: messages[message.room as any].messages.map(
                (messageItem: Message) => {
                  if (messageItem._id === message._id) {
                    return message;
                  }
                  return messageItem;
                }
              ),
              initialLoad: messages[message.room as any].initialLoad,
            },
          }));
          setRooms((rooms) =>
            rooms.map((room) => {
              if (room._id === message.room) {
                return {
                  ...room,
                  lastTenMessages: room.lastTenMessages.map(
                    (messageFromRoom) => {
                      if ((messageFromRoom as Message)._id === message._id) {
                        return message;
                      }
                      return messageFromRoom;
                    }
                  ),
                };
              }
              return room;
            })
          );
        });
      });
    }
  }, [token]);

  useEffect(() => {
    if (userData) {
      if (userData.user.onBoardingState === "onBoarding") {
        navigate("/onboarding");
      }
      console.log(userData);
    }
  }, [userData]);
  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <Header />
      <Outlet />
    </Space>
  );
};

export default Layout;
