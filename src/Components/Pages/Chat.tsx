import React from "react";

import { FlexBlock } from "../Styles/Blocks";
import ListUser from "../Chat/Users/ListUser";
import ListMessage from "../Chat/Messages/ListMessage";
import { Redirect } from "react-router-dom";
import IConnection from "../Chat/Interfaces/IConnection";

const Chat = (props: IConnection) => {

    if (props.Socket === null)
    {
        return <Redirect to="/chats" />
    }

    return(
        <FlexBlock>
            <ListUser Socket={props.Socket} />
            <ListMessage Socket={props.Socket} />
        </FlexBlock>
    );
}

export default Chat;