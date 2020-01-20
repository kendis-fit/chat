import { SET_CHAT } from "../Constants/Actions";

export const SetChat = (chatId: string) => ({
    type: SET_CHAT,
    value: chatId
})