import React, { useState } from "react";

import FormCreateChat, { BlockInputData, BlockSendData } from "../Styles/FormCreateChat";

const CreateChat = () => {

    const [showChat, setShowChat] = useState(false);

    return (
        <FormCreateChat>
            <BlockInputData IsRequired={true}>
                <div>
                    <label htmlFor="Host">Host</label>
                </div>
                <input id="Host" type="text" />
            </BlockInputData>
            <BlockInputData IsRequired={true}>
                <div>
                    <label htmlFor="Name">Server name</label>
                </div>
                <input id="Name" type="text" />
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
                    <input id="Password" type="password" />
                </BlockInputData>
            }
            <BlockSendData>
                <button type="submit">Create</button>
            </BlockSendData>
        </FormCreateChat>
    );
}

export default CreateChat;