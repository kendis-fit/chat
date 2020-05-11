import { Socket, Server } from "socket.io";

import User from "../Models/DB/User";
import Message from "../Models/DB/Message";
import NotFoundError from "../Errors/NotFoundError";
import IMessageSender from "../Models/DTO/IMessageSender";

const sendMessage = async (server: Server, socket: Socket, message: IMessageSender) =>
{
    try
    {
        const user: any = await User.findOne({ SocketId: socket.id })
            .populate({
                path: "Chat",
                select: { Messages: 1 }
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

        const msg: any = await Message.create({ Author: user._id, Chat: user.Chat._id, Content: message.Content });

        user.Chat.Messages.push(msg._id);
        user.Messages.push(msg._id);

        msg.save();
        user.Chat.save();
        user.save();

        server.to(user.Chat._id.toString()).emit("receiveMessage", { Author: { Name: user.Name }, Content: msg.Content, CreatedAt: msg.CreatedAt });
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
    socket.on("sendMessage", (message: IMessageSender) => sendMessage(server, socket, message));
}