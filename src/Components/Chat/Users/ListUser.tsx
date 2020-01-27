import React, { createRef } from "react";

import ItemUser from "./ItemUser";
import IUser from "../Interfaces/IUser";
import IInitProps from "../Interfaces/IListUser";
import { BlockUsers, ButtonShowUsers, CloseListUsers } from "../../Styles/ChatView";

interface IListUser
{
    Users: IUser[];
    Show: boolean;
}

export default class ListUser extends React.Component<IInitProps, IListUser> 
{
    private listUsers: React.RefObject<HTMLUListElement>;

    constructor(props: IInitProps)
    {
        super(props);
        this.state = {
            Users: this.props.Users,
            Show: false
        };
        this.props.Socket.on("receiveUser", (user: IUser) => this.setState((state) => ({ Users: [...state.Users, user] })));
        this.props.Socket.on("leftUser", (name: string) => this.setState((state) => ({ Users: state.Users.filter(user => user.Name !== name) })));
        this.props.Socket.on("exitChat", this.LeaveChat);
    
        this.listUsers = createRef<HTMLUListElement>();
    }

    LeaveChat()
    {
        alert("Host has left from the chat");
        window.location.href = "/chats";
    }

    set VisibleUsers(isVisible: boolean)
    {
        this.setState((state) => ({
            ...state, Show: isVisible
        }));
    }

    render() 
    {
        return(
            <>
                <BlockUsers Show={this.state.Show} ref={this.listUsers}>
                    {
                        this.state.Show && <CloseListUsers onClick={() => this.VisibleUsers = false}>&times;</CloseListUsers>
                    }
                    {
                        this.state.Users.map((user, key) => <ItemUser {...user} key={key} />)
                    }
                </BlockUsers>
                <ButtonShowUsers onClick={() => this.VisibleUsers = true}>Show users</ButtonShowUsers>
            </>
        );
    }
}