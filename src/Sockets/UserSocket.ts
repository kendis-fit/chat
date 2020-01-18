import mongoose from "mongoose";
import { Socket } from "socket.io";

import User from "../Models/DB/User";
import NotFoundError from "../Errors/NotFoundError";
import Message from "../Models/DB/Message";


const joinToChat = async (socket: Socket) =>
{
    try
    {
        const senderId = mongoose.Types.ObjectId(socket.id);

        const projectionUser = { _id: 0, Chat: 1, Messages: 1, Name: 1 };
        const projectionUsers = { _id: 1 };
        const projectionChat = { _id: 0, Users: 1 };
        const projectionMessage = { _id: 0, Content: 1, CreatedAt: 1 };

        const user: any = await User.findOne({ _id: senderId }, projectionUser)
            .populate({
                path: "Chat",
                populate: { path: "Users", select: projectionUsers },
                select: projectionChat
            })
            .populate({
                path: "Messages",
                select: projectionMessage
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

        const firstMessage = user.Messages[0]; // it generates in controller

        user.Chat.Users.forEach((usr: any) => socket.to(usr._id.toString()).emit("receiveMessage", firstMessage));
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

const leftFromChat = async (socket: Socket) =>
{
    try
    {
        const senderId = mongoose.Types.ObjectId(socket.id);

        const user: any = await User.findOneAndUpdate({ _id: senderId }, { IsActive: false }).populate("Chat").exec();
        if (!user)
        {
            throw new NotFoundError("user not found");
        }
        if (user.Status === "admin")
        {
            user.Chat.Users.forEach((usr: any) => socket.to(usr._id.toString()).emit("exitChat"));
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

            user.Chat.Users.forEach((usr: any) => socket.to(usr._id.toString()).emit("receiveMessage", { Author: { Name: message.Name }, Content: message.Content, CreatedAt: message.CreatedAt }));
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

export default (socket: Socket) =>
{
    socket.on("joinToChat", () => joinToChat(socket));
    socket.on("disconnect", () => leftFromChat(socket));
}