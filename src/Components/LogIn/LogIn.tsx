import io from "socket.io-client";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import ChatApi from "../../Api/ChatApi";
import ILogin from "./Interfaces/ILogin";
import ILogInProps from "./Interfaces/ILogInProps";

const LogIn = (props: ILogInProps) => {
    
    const [user, setUser] = useState<ILogin>({
        Id: "",
        Login: ""
    });

    const [isSubmited, setIsSubmited] = useState(false);

    const SetUserByKey = (key: string, value: string) => {
        let newUser = {...user};
        newUser[key] = value;

        setUser(newUser);
    }

    const LogInToChat = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const clientConnection = io.connect("http://localhost:5000");

        clientConnection.on("connect", async () => {

            try
            {
                // TO DO: exceptions
                await ChatApi.LoginToChat(props.Id, {...user, Id: clientConnection.id});
                clientConnection.emit("joinToChat");
                props.SetConnection(clientConnection);
                setIsSubmited(true);
            }
            catch (error)
            {
                clientConnection.disconnect();
                alert(error.message);
            }
        });
    }

    if (isSubmited)
    {
        return <Redirect to={`/chats/${props.Id}`} />
    }

    return(
        <form onSubmit={LogInToChat}>
            <div>
                <input type="text" placeholder="Nickname" onChange={(e) => SetUserByKey("Login", e.target.value)} required={true} />
            </div>
            {
                props.IsPassword &&
                <div>
                    <input type="password" placeholder="Password" onChange={(e) => SetUserByKey("Password", e.target.value)} required={true} />
                </div>
            }
            <button>Log in</button>
        </form>
    );
}

export default LogIn;