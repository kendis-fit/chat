import React, { useState } from "react";

import ItemUser from "./ItemUser";
import IListUser from "../Interfaces/IListUser";

const ListUser = (props: IListUser) => {

    const [users, setUsers] = useState(props.Users);

    return(
        <ul>
            {
                users.map((user, key) => <ItemUser {...user} key={key} />)
            }
        </ul>
    );
}

export default ListUser;