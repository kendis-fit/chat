import io from "socket.io-client";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Menu from "../Menu";
import ChatApi from "../../Api/ChatApi";
import { BlockCenter } from "../Styles/Blocks";
import ICreatingChat from "./Interfaces/ICreatingChat";
import ICreatingChatAction from "./Interfaces/ICreatingChatAction";
import { BlockInputData, BlockSendData } from "../Styles/FormCreateChat";

const CreateChat = (props: ICreatingChatAction) => {

    const [isSubmitChat, setIsSubmitChat] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [chat, setChat] = useState<ICreatingChat>({
        Id: "",
        Name: "",
        Host: ""
    });
    const [chatId, setChatId] = useState("");

    const setChatByKey = (key: string, value: string): void => {

        let newChat = {...chat};
        newChat[key] = value;

        setChat(newChat);
    }

    const createChat = (e: React.FormEvent) => {
        e.preventDefault();

        let hostConnection = io.connect("http://localhost:5000");

        hostConnection.on("connect", async () => {

            try
            {
                const result = await ChatApi.Create({...chat, Id: hostConnection.id});
                hostConnection.emit("joinToChat");
                setChatId(result.ChatId);
                props.SetConnection(hostConnection);
                setIsSubmitChat(true);
            }
            catch (error)
            {
                hostConnection.disconnect();
                alert(error.message);
            }
        });
    }
    
    if (isSubmitChat) {
        return <Redirect to={`/chats/${chatId}`} />
    }

    return (
        <>
            <Menu />
            <BlockCenter Width="250px">
                <form onSubmit={createChat}>
                    <BlockInputData IsRequired={true}>
                        <div>
                            <label htmlFor="Host">Host</label>
                        </div>
                        <input id="Host" type="text" minLength={4} onChange={(e) => setChatByKey("Host", e.target.value)} required={true} />
                    </BlockInputData>
                    <BlockInputData IsRequired={true}>
                        <div>
                            <label htmlFor="Name">Server name</label>
                        </div>
                        <input id="Name" type="text" minLength={4} onChange={(e) => setChatByKey("Name", e.target.value)} required={true} />
                    </BlockInputData>
                    <BlockInputData IsRequired={false}>
                        <input id="IsPassword" type="checkbox" onClick={() => setShowChat(!showChat)} />
                        <label htmlFor="IsPassword"> - Is Password</label>
                    </BlockInputData>
                    {
                        showChat &&
                        <BlockInputData IsRequired={true}>
                            <div>
                                <label htmlFor="Password">Password</label>
                            </div>
                            <input id="Password" type="password" minLength={5} onChange={(e) => setChatByKey("Password", e.target.value)} required={true} />
                        </BlockInputData>
                    }
                    <BlockSendData>
                        <button type="submit">Create</button>
                    </BlockSendData>
                </form>
            </BlockCenter>
        </>
    );
}

export default CreateChat;