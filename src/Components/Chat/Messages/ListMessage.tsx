import React, { useState, useEffect } from "react";

import ItemMessage from "./ItemMessage"
import SendMessage from "./SendMessage";
import IMessage from "../Interfaces/IMessage";
import { FlexBlock } from "../../Styles/Blocks";
import IConnection from "../Interfaces/IConnection";
import FlexDirection from "../../../Constants/FlexDirection";
import { BlockMessages, BlockCenterUsers } from "../../Styles/ChatView";

const ListMessage = (props: IConnection) => {

    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        props.Socket.on("receiveMessage", (message: IMessage) => { 

            setMessages([...messages, message])
        });

    }, [messages, props]);

    return(
        <BlockCenterUsers>
            <FlexBlock FlexDirection={FlexDirection.COLUMN}>
                <BlockMessages>
                    {
                        messages.map((message, key) => <ItemMessage {...message} key={key} />)
                    }
                </BlockMessages>
                <SendMessage Socket={props.Socket} />
            </FlexBlock>
        </BlockCenterUsers>
    );
}

export default ListMessage;