import { Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";

import ChatApi from "../../Api/ChatApi";
import { FlexBlock } from "../Styles/Blocks";
import IUser from "../Chat/Interfaces/IUser";
import ListUser from "../Chat/Users/ListUser";
import IMessage from "../Chat/Interfaces/IMessage";
import ListMessage from "../Chat/Messages/ListMessage";
import IConnection from "../Chat/Interfaces/IConnection";

interface IChatProps extends IConnection
{
    Id: string;
}

const Chat = (props: IChatProps) => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        const initData = async () => {

            try {
                setUsers(await ChatApi.GetUsersById(props.Id));
                setMessages(await ChatApi.GetMessagesById(props.Id));
                setLoading(false);
            } catch (error) {
                alert(error.message);
                setError(true);
            }
        }
        initData();

    }, [props.Id]);

    if (props.Socket === null || error)
    {
        return <Redirect to="/chats" />
    }

    if (loading)
    {
        return <div>"Loading..."</div>;
    }

    return (
        <FlexBlock>
            <ListUser Users={users} Socket={props.Socket} />
            <ListMessage Messages={messages} Socket={props.Socket} />
        </FlexBlock>
    );
}

export default Chat;