import { Room } from "./Room";
import { User } from "./User";

export interface Message {
  _id: string;
  user: User;
  message: string;
  room: Room | string;
  participants: User[];
  createdAt: string;
  updatedAt: string;
  readBy: Array<string>;
}
