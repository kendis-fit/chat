import React, { useState, useEffect } from "react";

import ItemMessage from "./ItemMessage"
import SendMessage from "./SendMessage";
import IMessage from "../Interfaces/IMessage";
import IConnection from "../Interfaces/IConnection";

const ListMessage = (props: IConnection) => {

    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        props.Socket.on("receiveMessage", (message: IMessage) => { 

            setMessages([...messages, message])
        });

    }, [messages, props]);

    return(
        <>
            <ul>
                {
                    messages.map((message, key) => <ItemMessage {...message} key={key} />)
                }
            </ul>
            <SendMessage Socket={props.Socket} />
        </>
    );
}

export default ListMessage;