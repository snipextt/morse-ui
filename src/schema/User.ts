export interface User {
  _id: string;
  name?: string;
  email?: string;
  password: string;
  username?: string;
  profilePicture?: string;
  followers?: User[] | string[];
  followings?: User[] | string[];
  bio?: string;
  city?: string;
  from?: string;
  onBoardingState: "onBoarding" | "completed";
  createdAt?: Date;
  updatedAt?: Date;
}
