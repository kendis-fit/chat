import { Socket, Server } from "socket.io";

import User from "../Models/DB/User";
import NotFoundError from "../Errors/NotFoundError";
import Message from "../Models/DB/Message";

const joinToChat = async (server: Server, socket: Socket) =>
{
    try
    {
        const projectionUser = { _id: 0, Chat: 1, Messages: 1, Name: 1, Status: 1 };
        const projectionMessage = { _id: 0, Content: 1, CreatedAt: 1 };

        const user: any = await User.findOne({ SocketId: socket.id }, projectionUser)
            .populate({
                path: "Chat",
                populate: { path: "Messages", select: projectionMessage }
            })
            .exec();

        if (!user)
        {
            throw new NotFoundError("user not found");
        }
        if (!user.Chat)
        {
            throw new NotFoundError("chat not found");
        }

        const firstMessage = user.Chat.Messages[0]; // it generates in controller
        const joinedUser = { Name: user.Name, Status: user.Status };

        socket.join(user.Chat._id.toString());

        server.to(user.Chat._id.toString()).emit("receiveMessage", firstMessage);
        server.to(user.Chat._id.toString()).emit("receiveUser", joinedUser);
    }
    catch (error)
    {
        if (error instanceof NotFoundError)
        {
            socket.emit("error", { Type: error.Type, Message: error.Message });
        }
        else
        {
            socket.emit("error", { Type: "sendMessage" });
        }
    }
}

const leftFromChat = async (server: Server, socket: Socket) =>
{
    try
    {
        const user: any = await User.findOneAndUpdate({ SocketId: socket.id }, { $set: { IsActive: false }})
            .populate({
                path: "Chat",
                select: { _id: 1, Messages: 1 }
            })
            .exec();
        if (!user)
        {
            throw new NotFoundError("user not found");
        }
        if (user.Status === "admin")
        {
            server.to(user.Chat._id.toString()).emit("exitChat");
            user.Chat?.remove();
        }
        else 
        {
            const message: any = new Message({ Author: user._id, Chat: user.Chat._id, Content: `User ${user.Name} has left this chat` });

            user.Messages.push(message);
            user.Chat.Messages.push(message);

            message.save();
            user.save();
            user.Chat.save();

            server.to(user.Chat._id.toString()).emit("receiveMessage", { Author: { Name: message.Name }, Content: message.Content, CreatedAt: message.CreatedAt });
        }
    }
    catch (error)
    {
        if (error instanceof NotFoundError)
        {
            socket.emit("error", { Type: error.Type, Message: error.Message });
        }
        else
        {
            socket.emit("error", { Type: "sendMessage" });
        }
    }
}

export default (server: Server, socket: Socket) =>
{
    socket.on("joinToChat", () => joinToChat(server, socket));
    socket.on("disconnect", () => leftFromChat(server, socket));
}