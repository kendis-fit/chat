import React, { useState, useEffect, useRef } from "react";

import ItemUser from "./ItemUser";
import IUser from "../Interfaces/IUser";
import IInitProps from "../Interfaces/IListUser";
import { BlockUsers, ButtonShowUsers, CloseListUsers } from "../../Styles/ChatView";

const ListUser = (props: IInitProps) => {

    const [users, setUsers] = useState(props.Users);
    const [show, setShow] = useState(false);
    const listUsers = useRef<HTMLUListElement>(null);

    useEffect(() => {

        props.Socket.on("receiveUser", (user: IUser) => { 
                setUsers(users => {
                    if (!users.some(usr => usr.Name === user.Name))
                        return [...users, user];
                    return [...users];
                })
        });
        props.Socket.on("leftUser", (name: string) => setUsers(users => users.filter(user => user.Name !== name)));
        props.Socket.on("exitChat", () => {
            alert("Host has left from the chat");
            window.location.href = "/chats";
        });
        
    }, [props.Socket]);

    return(
        <>
            <BlockUsers Show={show} ref={listUsers}>
                {
                    show && <CloseListUsers onClick={() => setShow(false)}>&times;</CloseListUsers>
                }
                {
                    users.map((user, key) => <ItemUser {...user} key={key} />)
                }
            </BlockUsers>
            <ButtonShowUsers onClick={() => setShow(true)}>Show users</ButtonShowUsers>
        </>
    );
}

export default ListUser;