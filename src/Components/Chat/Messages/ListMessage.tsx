import React, { RefObject } from "react";

import ItemMessage from "./ItemMessage"
import SendMessage from "./SendMessage";
import IMessage from "../Interfaces/IMessage";
import { FlexBlock } from "../../Styles/Blocks";
import IInitProps from "../Interfaces/IListMessage";
import FlexDirection from "../../../Constants/FlexDirection";
import { BlockMessages, BlockCenterUsers } from "../../Styles/ChatView";

interface IListMessage
{
    Messages: IMessage[];
}

export default class ListMessage extends React.Component<IInitProps, IListMessage>
{
    private blockMessages: RefObject<HTMLUListElement>

    constructor(props: IInitProps)
    {
        super(props);
        this.state = {
            Messages: this.props.Messages
        };
        this.blockMessages = React.createRef<HTMLUListElement>();
        this.props.Socket.on("receiveMessage", (message: IMessage) => {
            this.setState({ Messages: [...this.state.Messages, message] })
            if (this.blockMessages.current)
                this.blockMessages.current.scrollTop = this.blockMessages.current.scrollHeight;
        });
    }

    render()
    {

        return(
            <BlockCenterUsers>
                <FlexBlock FlexDirection={FlexDirection.COLUMN}>
                    <BlockMessages ref={this.blockMessages}>
                        {
                            this.state.Messages.map((message, key) => <ItemMessage {...message} key={key} />)
                        }
                    </BlockMessages>
                    <SendMessage Socket={this.props.Socket} />
                </FlexBlock>
            </BlockCenterUsers>
        );
    }
}