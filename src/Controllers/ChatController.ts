import mongoose from "mongoose";
import { sha256 } from "js-sha256";
import express, { Router, Request, Response } from "express";

import User from "../Models/DB/User";
import Chat from "../Models/DB/Chat";
import Message from "../Models/DB/Message";
import IController from "./Interfaces/IController";

const getAll = async (req: Request, res: Response) =>
{
    const { offset, size } = req.query;

    const sizeN = Number(size);
    const offsetN = Number(offset);

    if (sizeN > 100)
    {
        res.sendStatus(400);
    }
    else
    {
        try
        {
            const projection = { _id: 1, Name: 1, Users: 1, Password: 1 };
            const chatsWithOffset = await Chat.find({}, projection).skip(offsetN).limit(sizeN).lean().exec()
            const chatsResult = chatsWithOffset.map(c => ({
                    Id: c._id,
                    Name: c.Name,
                    Users: c.Users.length,
                    IsPassword: c.Password !== undefined
                 }));
            res.status(200).send(chatsResult);
        }
        catch (message)
        {
            console.log(message);
            res.sendStatus(500);
        }
    }
}

const loginByChatId = async (req: Request, res: Response) =>
{
    try
    {
        const id = mongoose.Types.ObjectId(req.params.id);
        const { Id, Login, ServerPassword } = req.body;
        const chat: any = await Chat.findOne({ _id: id })
            .populate({
                path: "Users",
                match: { Name: { $eq: Login }},
                select: "Name"
            })
            .exec();
        if (!chat)
        {
            res.sendStatus(404);
        }
        else if (chat.Users.length > 0)
        {
            res.status(400).send({
                Message: `User ${Login} already exists in this room`
            });
        }
        else if (chat.Password && chat.Password !== sha256(ServerPassword))
        {
            res.status(400).send({
                Message: `Password doesn't fit`
            });
        }
        else
        {
            const user: any = new User({ SocketId: Id, Name: Login, Chat: chat._id });
            const message: any = new Message({ Author: user._id, Chat: chat._id, Content: `User ${Login} has joined to chat` });
            
            chat.Users.push(user);
            chat.Messages.push(message);

            user.save();
            chat.save();
            message.save();

            res.sendStatus(200);
        }
    }
    catch (error)
    {
        console.log(error);
        res.sendStatus(500);
    }
}

const createNewChat = async (req: Request, res: Response) =>
{
    const { Id, Name, Password, Host } = req.body;

    try
    {
        const chat: any = new Chat({ Name, Password });
        const user: any = new User({ SocketId: Id, Name: Host, Status: "admin", Chat: chat._id });
        const message: any = new Message({ Chat: chat._id, Author: user._id, Content: `Host ${Host} created chat.` });

        user.Messages.push(message._id);
        chat.Users.push(user._id);
        chat.Messages.push(message._id);

        message.save();
        user.save();
        chat.save();

        res.status(201).send({
            ChatId: chat.id
        });
    }
    catch (message)
    {
        res.sendStatus(500);
    }
}

export default class ChatController implements IController
{
    private readonly name: string;
    private readonly chatRouter: Router;
    private readonly jsonParser: any;

    public constructor()
    {
        this.name = "/chats";
        this.chatRouter = express.Router();
        this.jsonParser = express.json();
    }

    public get Name(): string
    {
        return this.name;
    }
    
    public Router(): Router
    {
        this.chatRouter.get("/", getAll);
        this.chatRouter.post("/", this.jsonParser, createNewChat);
        this.chatRouter.post("/:id", this.jsonParser, loginByChatId);
        return this.chatRouter;
    }
}