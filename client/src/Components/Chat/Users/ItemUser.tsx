import React from "react";

import IUser from "../Interfaces/IUser";

const ItemUser = (props: IUser) => {
    return(
        <li>{props.Name} - {props.Status}</li>
    );
}

export default ItemUser;