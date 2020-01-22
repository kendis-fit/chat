import React, { useState, useEffect } from "react";

import ChatApi from "../../Api/ChatApi";
import { FlexBlock } from "../Styles/Blocks";
import IUser from "../Chat/Interfaces/IUser";
import ListUser from "../Chat/Users/ListUser";
import IInitChat from "./Interfaces/IInitChat";
import IMessage from "../Chat/Interfaces/IMessage";
import ListMessage from "../Chat/Messages/ListMessage";
import { Redirect } from "react-router-dom";

const Chat = (props: IInitChat) => {

    const [initUsers, setInitUsers] = useState<IUser[]>([]);
    const [initMessages, setInitMessages] = useState<IMessage[]>([]);

    useEffect(() => {

        async function GetUsers()
        {
            const users = await ChatApi.GetUsersById(props.Id);
            setInitUsers(users);
        }

        async function GetMessages()
        {
            const messages = await ChatApi.GetMessagesById(props.Id);
            setInitMessages(messages);
        }

        GetUsers();
        GetMessages();

    }, [props]);

    if (props.Socket === null)
    {
        return <Redirect to="/chats" />
    }

    if (initUsers.length === 0 || initMessages.length === 0)
        return <div>Loading...</div>

    return(
        <FlexBlock>
            <ListUser Users={initUsers} Socket={props.Socket} />
            <ListMessage Messages={initMessages} Socket={props.Socket} />
        </FlexBlock>
    );
}

export default Chat;