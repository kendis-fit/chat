import React, { useState } from "react";

import IConnection from "../Interfaces/IConnection";
import { BlockSendMessage } from "../../Styles/ChatView";

const SendMessage = (props: IConnection) => {

    const [content, setContent] = useState("");

    function sendMessage() {
        if (content.length > 0) {
            props.Socket.emit("sendMessage", { Content: content });
            setContent("");
        }
    }

    function sendMessageByEnter(e: React.KeyboardEvent) {
        if (e.keyCode === 13) {
            sendMessage();
        }
    }

    return(
        <BlockSendMessage>
            <textarea value={content} onKeyDown={sendMessageByEnter} onChange={e => setContent(e.target.value)}></textarea>
            <button onClick={sendMessage}>Send message</button>
        </BlockSendMessage>
    );
}

export default SendMessage;