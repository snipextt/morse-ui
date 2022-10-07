import { atom } from "recoil";
import { Room } from "../schema/Room";

const userRoomsState = atom<Room[]>({
  key: "rooms",
  default: [],
});

export default userRoomsState;
