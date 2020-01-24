import ICreatingChat from "../Components/Pages/Interfaces/ICreatingChat";

export default class ChatApi
{
    public static async Create(chat: ICreatingChat)
    {
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
            return chatId;
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
            const response = await fetch(`http://localhost:5000/chats?offset=${offset}&size=${size}`);
            const listChat = await response.json();
            return listChat;
        }
        catch (error)
        {
            throw error;
        }
    }

    public static async GetUsersById(id: number)
    {
        try
        {
            const response = await fetch(`http://localhost:5000/chats/${id}/users`);
            const listUsers = await response.json();
            return listUsers;
        }
        catch (error)
        {
            throw error;
        }
    }

    public static async GetMessagesById(id: number)
    {
        try
        {
            const response = await fetch(`http://localhost:5000/chats/${id}/messages`);
            const listUsers = await response.json();
            return listUsers;
        }
        catch (error)
        {
            throw error;
        }
    }
}