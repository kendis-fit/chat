import React, { useState } from "react";

const CreateChat = () => {

    const [showChat, setShowChat] = useState(false);

    return (
        <form>
            <div>
                <label htmlFor="Host">Host</label>
                <input id="Host" type="text" />
            </div>
            <div>
                <label htmlFor="Name">Server name</label>
                <input id="Name" type="text" />
            </div>
            <div>
                <label htmlFor="IsPassword">IsPassword</label>
                <input id="IsPassword" type="checkbox" onClick={() => setShowChat(!showChat)} />
            </div>
            {
                showChat &&
                <div>
                    <label htmlFor="Password">Password</label>
                    <input id="Password" type="password" />
                </div>
            }
            <button type="submit">Create</button>
        </form>
    );
}

export default CreateChat;