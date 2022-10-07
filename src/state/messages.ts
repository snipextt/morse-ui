import { atom } from "recoil";
import { Message } from "../schema/Message";

interface MesageStateProps {
  messages: Message[];
  initialLoad: boolean;
}

const messagesState = atom<Record<string, MesageStateProps>>({
  key: "messagesState",
  default: {},
});

export default messagesState;
