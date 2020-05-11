import { Schema, model } from "mongoose";

export const MessageSchema = new Schema(
{
    Author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    Content: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    Chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat"
    }
},
{
    versionKey: false,
    collection: "Messages"
});

const Message = model("Message", MessageSchema);

export default Message;