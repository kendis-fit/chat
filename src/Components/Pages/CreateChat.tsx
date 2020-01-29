import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { FormikValues, useFormik } from "formik";

import Menu from "../Menu";
import ChatApi from "../../Api/ChatApi";
import { BlockCenter } from "../Styles/Blocks";
import ICreatingChat from "./Interfaces/ICreatingChat";
import ICreatingChatAction from "./Interfaces/IConnection";
import CreateConnection from "../../Helpers/CreateConnection";
import { BlockInputData, BlockSendData } from "../Styles/FormCreateChat";

const CreateChat = (props: ICreatingChatAction) => {

    const [isSubmitChat, setIsSubmitChat] = useState(false);
    const [password, setPassword] = useState(false);
    const [chatId, setChatId] = useState("");

    const formik = useFormik({
        initialValues: {
            Name: "",
            Host: "",
            Password: ""
        },
        onSubmit: values => createChat(values)
    });

    const createChat = async (values: FormikValues) => {

        let hostConnection: SocketIOClient.Socket | undefined;
        try
        {
            hostConnection = await CreateConnection();
            const result = await ChatApi.Create({...values, Id: hostConnection.id} as ICreatingChat);
            hostConnection.emit("joinToChat");
            setChatId(result.ChatId);
            props.SetConnection(hostConnection);
            setIsSubmitChat(true);
        }
        catch (error)
        {
            hostConnection?.disconnect();
            alert(error.message);
        }
    }
    
    if (isSubmitChat) {
        return <Redirect to={`/chats/${chatId}`} />
    }

    return (
        <>
            <Menu />
            <BlockCenter Width="250px">
                <form onSubmit={formik.handleSubmit}>
                    <BlockInputData IsRequired={true}>
                        <div>
                            <label htmlFor="Host">Host</label>
                        </div>
                        <input id="Host" name="Host" type="text" minLength={4} onChange={formik.handleChange} value={formik.values.Host} required={true} />
                    </BlockInputData>
                    <BlockInputData IsRequired={true}>
                        <div>
                            <label htmlFor="Name">Server name</label>
                        </div>
                        <input id="Name" name="Name" type="text" minLength={4} onChange={formik.handleChange} value={formik.values.Name} required={true} />
                    </BlockInputData>
                    <BlockInputData IsRequired={false}>
                        <input id="IsPassword" type="checkbox" onClick={() => setPassword(!password)} />
                        <label htmlFor="IsPassword"> - Is Password</label>
                    </BlockInputData>
                    {
                        password &&
                        <BlockInputData IsRequired={true}>
                            <div>
                                <label htmlFor="Password">Password</label>
                            </div>
                            <input id="Password" name="Password" type="password" minLength={5} onChange={formik.handleChange} value={formik.values.Password} required={true} />
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