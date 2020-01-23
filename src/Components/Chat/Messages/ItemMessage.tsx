import React from "react";

import IMessage from "../Interfaces/IMessage";

const ItemMessage = (props: IMessage) => {
    return(
        <li> 
            <div>
                <span>{props.Author ? props.Author.Name : ""}</span>
            </div>
            <div>
                {props.Content}
                {new Date(props.CreatedAt).toLocaleTimeString()}
            </div>
        </li>   
    );
}

export default ItemMessage;