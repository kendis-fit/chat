import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import IConnection from "./Interfaces/IConnection";
import ICreatingChat from "./Interfaces/ICreatingChat";
import FormCreateChat, { BlockInputData, BlockSendData } from "../Styles/FormCreateChat";

const CreateChat = (props: IConnection) => {

    const [isSubmitChat, setIsSubmitChat] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [chat, setChat] = useState<ICreatingChat>({
        Name: "",
        Host: ""
    });

    const setChatByKey = (key: string, value: string): void => {

        let newChat = {...chat};
        newChat[key] = value;

        setChat(newChat);
    }

    const createChat = (e: React.FormEvent) => {
        
        props.SetChat(chat);

        e.preventDefault();
        setIsSubmitChat(true);
    }
    
    if (isSubmitChat) {
        return <Redirect to="/chat" />
    }

    return (
        <FormCreateChat onSubmit={createChat}>
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
        </FormCreateChat>
    );
}

export default CreateChat;