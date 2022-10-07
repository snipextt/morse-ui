import { User } from "./User";
import { Message } from "./Message";

export interface Room {
  _id: string;
  participants: Array<User | string>;
  attachments: string[];
  lastTenMessages: Array<Message | string>;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}
