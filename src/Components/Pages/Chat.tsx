import React from "react";
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
}

interface IChatProps extends IConnection
{
    Id: number;
}

export default class Chat extends React.Component<IChatProps, IChatState>
{
    constructor(props: IChatProps)
    {
        super(props);
        this.state = {
            Users: [],
            Messages: [],
            IsFetched: false
        }
    }

    async componentDidMount()
    {
        const users = await ChatApi.GetUsersById(this.props.Id);
        const messages = await ChatApi.GetMessagesById(this.props.Id);
        this.setState({
            Users: users,
            Messages: messages,
            IsFetched: true
        });
    }

    private RedirectToHome()
    {
        return <Redirect to="/chats" />
    }

    private RenderChat()
    {
        if (this.state.IsFetched)
        return(
            <FlexBlock>
                <ListUser Users={this.state.Users} Socket={this.props.Socket} />
                <ListMessage Messages={this.state.Messages} Socket={this.props.Socket} />
            </FlexBlock>
        );
        return "Loading...";
    }

    render()
    {
        if (this.props.Socket === null)
        {
            return this.RedirectToHome();
        }
        return this.RenderChat();
    }
}