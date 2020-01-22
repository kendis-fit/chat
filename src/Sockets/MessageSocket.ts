import { Socket } from "socket.io";

import User from "../Models/DB/User";
import Message from "../Models/DB/Message";
import NotFoundError from "../Errors/NotFoundError";
import IMessageSender from "../Models/DTO/IMessageSender";

const sendMessage = async (socket: Socket, message: IMessageSender) =>
{
    try
    {
        const user: any = await User.findOne({ SocketId: socket.id }).populate("Chat").exec();
        if (!user)
        {
            throw new NotFoundError("user not found");
        }
        if (!user.Chat)
        {
            throw new NotFoundError("chat not found");
        }

        const msg: any = await Message.create({ Author: user._id, Chat: user.Chat._id, Content: message.Content });

        user.Chat.Messages.push(msg._id);
        user.Messages.push(msg._id);

        msg.save();
        user.Chat.save();
        user.save();

        user.Chat.Users.forEach((usr: any) => socket.to(usr.SocketId).emit("receiveMessage", { Author: { Name: msg.Name }, Content: msg.Content, CreatedAt: msg.CreatedAt }));
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
    socket.on("sendMessage", (message: any) => sendMessage(socket, message));
}