import React from "react";

import IMessage from "../Interfaces/IMessage";

const ItemMessage = (props: IMessage) => {
    return(
        <div> {props.Author ? props.Author.Name : ""}: {props.Content} created by {props.CreatedAt}</div>
    );
}

export default ItemMessage;