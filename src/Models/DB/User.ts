import { Schema, model } from "mongoose";

export const UserSchema = new Schema(
{
    Name: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    Chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat"
    },
    IsActive: {
        type: Boolean,
        default: true
    },
    Messages: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    SocketId: {
        type: String,
        required: true
    }
},
{
    versionKey: false,
    collection: "Users"
});

const User = model("User", UserSchema);

export default User;