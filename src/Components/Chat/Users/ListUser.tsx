import React, { useState, useEffect } from "react";

import ItemUser from "./ItemUser";
import IUser from "../Interfaces/IUser";
import IListUser from "../Interfaces/IListUser";

const ListUser = (props: IListUser) => {

    const [users, setUsers] = useState(props.Users);

    useEffect(() => {

        props.Socket.on("receiveUser", (user: IUser) => setUsers([...users, user]));

    }, [users, props]);

    return(
        <ul>
            {
                users.map((user, key) => <ItemUser {...user} key={key} />)
            }
        </ul>
    );
}

export default ListUser;