import React from "react";

import ItemUser from "./ItemUser";
import IUser from "../Interfaces/IUser";
import IInitProps from "../Interfaces/IListUser";
import { BlockUsers } from "../../Styles/ChatView";

interface IListUser
{
    Users: IUser[];
}

export default class ListUser extends React.Component<IInitProps, IListUser> 
{
    constructor(props: IInitProps)
    {
        super(props);
        this.state = {
            Users: this.props.Users
        };
        this.props.Socket.on("receiveUser", (user: IUser) => this.setState({ Users: [...this.state.Users, user] }));
        this.props.Socket.on("leftUser", (Name: string) => this.setState({ Users: this.state.Users.filter(user => user.Name !== Name) }));
        this.props.Socket.on("exitChat", this.LeaveChat);
    }

    LeaveChat()
    {
        alert("Host has left from the chat");
        window.location.href = "/chats";
    }

    render() 
    {
        return(
            <BlockUsers>
                {
                    this.state.Users.map((user, key) => <ItemUser {...user} key={key} />)
                }
            </BlockUsers>
        );
    }
}