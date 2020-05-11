import ILogin from "../Components/LogIn/Interfaces/ILogin";
import ICreatingChat from "../Components/Pages/Interfaces/ICreatingChat";

export default class ChatApi
{
    public static async Create(chat: ICreatingChat)
    {
        try
        {
            const response = await fetch(`${process.env["REACT_APP_CHAT_API"]}/chats`, {
                body: JSON.stringify(chat),
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
            });
            if (response.ok)
            {
                const chatId = await response.json();
                return chatId;
            }
            throw new Error("Not found");
        }
        catch (error)
        {
            throw error;
        }
    }

    public static async GetAll(offset: number, size: number)
    {
        try
        {
            const response = await fetch(`${process.env["REACT_APP_CHAT_API"]}/chats?offset=${offset}&size=${size}`);
            const listChat = await response.json();
            return listChat;
        }
        catch (error)
        {
            throw error;
        }
    }

    public static async GetUsersById(id: string)
    {
        try
        {
            const response = await fetch(`${process.env["REACT_APP_CHAT_API"]}/chats/${id}/users`);
            const listUsers = await response.json();
            return listUsers;
        }
        catch (error)
        {
            throw error;
        }
    }

    public static async GetMessagesById(id: string)
    {
        try
        {
            const response = await fetch(`${process.env["REACT_APP_CHAT_API"]}/chats/${id}/messages`);
            const listUsers = await response.json();
            return listUsers;
        }
        catch (error)
        {
            throw error;
        }
    }

    public static async LoginToChat(id: string, user: ILogin)
    {
        try
        {
            const response = await fetch(`${process.env["REACT_APP_CHAT_API"]}/chats/${id}`, {
                body: JSON.stringify(user),
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
            });
            switch (response.status)
            {
                case 200:
                    return true;
                case 400:
                    const error = await response.json();
                    throw new Error(error.Message);
                default:
                    throw new Error("Server error");
            }
        }
        catch (error)
        {
            throw error;
        }
    }
}