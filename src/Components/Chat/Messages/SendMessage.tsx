import React, { useState } from "react";

import IConnection from "../Interfaces/IConnection";
import { BlockSendMessage } from "../../Styles/ChatView";

const SendMessage = (props: IConnection) => {

    const [content, setContent] = useState("");

    function sendMessage() {
        props.Socket.emit("sendMessage", { Content: content });
        setContent("");
    }

    return(
        <BlockSendMessage>
            <textarea value={content} onChange={e => setContent(e.target.value)}></textarea>
            <button onClick={sendMessage}>Send message</button>
        </BlockSendMessage>
    );
}

export default SendMessage;