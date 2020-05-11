import { SET_CHAT } from "../Constants/Actions";
import ISelectChat from "../Components/Pages/Interfaces/ISelectChat";

export const SetChat = (chat: ISelectChat) => ({
    type: SET_CHAT,
    value: chat
});