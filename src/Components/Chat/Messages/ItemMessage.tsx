import React from "react";

import IMessage from "../Interfaces/IMessage";
import { BlockMessage, BlockTitleAndData, BlockContent } from "../../Styles/ChatView";

const ItemMessage = (props: IMessage) => {
    return(
        <BlockMessage> 
            <BlockTitleAndData>
                <div>{props.Author ? props.Author.Name : ""}</div>
                <div>{new Date(props.CreatedAt).toLocaleTimeString()}</div>
            </BlockTitleAndData>
            <BlockContent>
                {props.Content}
            </BlockContent>
        </BlockMessage>   
    );
}

export default ItemMessage;