import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import ChatApi from "../../Api/ChatApi";
import { FlexBlock } from "../Styles/Blocks";
import ListUser from "../Chat/Users/ListUser";
import ListMessage from "../Chat/Messages/ListMessage";
import IConnection from "../Chat/Interfaces/IConnection";
import IMessage from "../Chat/Interfaces/IMessage";
import IUser from "../Chat/Interfaces/IUser";

interface IChatState
{
    Users: IUser[];
    Messages: IMessage[];
    IsFetched: boolean;
    IsError: boolean;
}

interface IChatProps extends IConnection
{
    Id: string;
}

const Chat = (props: IChatProps) => {

    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
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
        // eslint-disable-next-line
    }, []);

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