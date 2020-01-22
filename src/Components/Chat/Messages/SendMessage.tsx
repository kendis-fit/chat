import React, { useState } from "react";

import IConnection from "../Interfaces/IConnection";

const SendMessage = (props: IConnection) => {

    const [content, setContent] = useState("");

    function sendMessage() {
        props.Socket.emit("sendMessage", { Content: content });
        setContent("");
    }

    return(
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <textarea value={content} onChange={e => setContent(e.target.value)}></textarea>
            <button onClick={sendMessage}>Send message</button>
        </div>
    );
}

export default SendMessage;