import ICreatingChat from "../Components/Pages/Interfaces/ICreatingChat";

import { SetChat } from "../Actions/ChatActions";
import { SetConnect } from "../Actions/ConnectionActions";

export default class ChatApi
{
    public static Create(chat: ICreatingChat)
    {
        return async (dispatch: any) => {
            try
            {
                const response = await fetch("http://localhost:5000/chats", {
                    body: JSON.stringify(chat),
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                });
                const chatId = await response.json();
                dispatch(SetChat(chatId));

                const hostConnection = io.connect("http://localhost");
                dispatch(SetConnect(hostConnection));
            }
            catch (error)
            {
                alert(error.message);
            }
        }
    }
}