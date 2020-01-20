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
}