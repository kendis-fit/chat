import React, { useRef, useState, useEffect } from "react";

import ItemMessage from "./ItemMessage"
import SendMessage from "./SendMessage";
import IMessage from "../Interfaces/IMessage";
import { FlexBlock } from "../../Styles/Blocks";
import IInitProps from "../Interfaces/IListMessage";
import FlexDirection from "../../../Constants/FlexDirection";
import { BlockMessages, BlockCenterUsers } from "../../Styles/ChatView";

const ListMessage = (props: IInitProps) => {

    const [messages, setMessages] = useState<IMessage[]>(props.Messages);
    const blockMessages = useRef<HTMLUListElement>(null);

    useEffect(() => {

        const scrollDown = () => {
            if (blockMessages.current)
            {
                blockMessages.current.scrollTop = blockMessages.current.scrollHeight;
            }
        }
        scrollDown();

        props.Socket.on("receiveMessage", (message: IMessage) => {
            setMessages(messages => [...messages, message]);
            scrollDown();
        });
        
    }, [props.Socket]);

    return(
        <BlockCenterUsers>
            <FlexBlock FlexDirection={FlexDirection.COLUMN}>
                <BlockMessages ref={blockMessages}>
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