import { User } from "./User";

export interface Story {
  user?: User;
  media: string;
  mediaType: "image" | "video" | "text";
  createdAt?: Date;
  updatedAt?: Date;
  caption?: string;
  backgroundColor?: string;
}
