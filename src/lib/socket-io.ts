import toast from "react-hot-toast";
import socket, { Socket } from "socket.io-client";
import { SocketEvents } from "../constants";
import { Message } from "../schema/Message";
import { Room } from "../schema/Room";
import { Cookie } from "../utils";
let io: Socket;

export const createSocketConnection = () => {
  if (io) return new Promise<void>((resolve) => resolve());
  return new Promise<Socket>((resolve) => {
    io = socket(import.meta.env.VITE_SOCKET_URI, {
      auth: {
        token: Cookie.get("token"),
      },
    });
    io.on("connect", () => resolve(io));
    io.on("connect_error", (error) => toast.error(error.message));
    io.on("error", console.error);
  });
};

export const getAllRooms = () => {
  return new Promise<Room[]>((resolve, reject) => {
    try {
      io?.emit(SocketEvents.ALL_ROOMS);
      io?.once(SocketEvents.ALL_ROOMS, (rooms) => {
        resolve(rooms);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllNotifications = () => {
  return new Promise((resolve, reject) => {
    try {
      io?.send(SocketEvents.ALL_NOTIFICATIONS);
      io?.once(SocketEvents.ALL_NOTIFICATIONS, (notifications) => {
        resolve(notifications);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const messageCreate = (
  message: string,
  roomId?: string,
  userId?: string
) => {
  io.emit(SocketEvents.MESSAGE_CREATE, { message, roomId, userId });
};

export const getRoomMessages = (roomId: string) => {
  return new Promise<void>((resolve, reject) => {
    try {
      io?.emit(SocketEvents.GET_ROOM_MESSAGES, roomId);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const markMessageAsRead = (messageId: string) => {
  io?.emit(SocketEvents.MESSAGE_READ, messageId);
};
