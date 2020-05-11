import { sha256 } from "js-sha256";
import { Schema, model } from "mongoose";

import User from "./User";
import Message from "./Message";

export const ChatSchema = new Schema(
{
    Name: {
        type: String,
        required: true
    },
    Password: {
        type: String
    },
    Users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    Messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }]
}, 
{
    versionKey: false,
    collection: "Chats"
});

ChatSchema.pre("save", function(next) {
    const newChat: any = this;
    if (typeof newChat.Password !== "undefined")
    {
        newChat.Password = sha256(newChat.Password);
    }
    next();
});

ChatSchema.pre("remove", function(next) {
    User.deleteMany({ Chat: this._id }).exec();
    Message.deleteMany({ Chat: this._id }).exec();
    next();
});

const Chat = model("Chat", ChatSchema);

export default Chat;