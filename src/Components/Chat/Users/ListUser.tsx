import React, { useState, useEffect } from "react";

import ItemUser from "./ItemUser";
import IUser from "../Interfaces/IUser";
import IConnection from "../Interfaces/IConnection";
import { BlockUsers } from "../../Styles/ChatView";

const ListUser = (props: IConnection) => {

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {

        props.Socket.on("receiveUser", (user: IUser) => setUsers([...users, user]));

    }, [users, props]);

    return(
        <BlockUsers>
            {
                users.map((user, key) => <ItemUser {...user} key={key} />)
            }
        </BlockUsers>
    );
}

export default ListUser;