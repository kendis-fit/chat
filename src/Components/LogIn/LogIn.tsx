import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import ChatApi from "../../Api/ChatApi";
import ILogin from "./Interfaces/ILogin";
import { FormLogIn } from "./LogInStyle";
import ILogInProps from "./Interfaces/ILogInProps";
import CreateConnection from "../../Helpers/CreateConnection";

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

    const LogInToChat = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let clientConnection: SocketIOClient.Socket | undefined;
        try
        {
            clientConnection = await CreateConnection();
            await ChatApi.LoginToChat(props.Id, {...user, Id: clientConnection.id});
            clientConnection.emit("joinToChat");
            props.SetConnection(clientConnection);
            setIsSubmited(true);
        }
        catch (error)
        {
            clientConnection?.disconnect();
            alert(error.message);
        }
    }

    if (isSubmited)
    {
        return <Redirect to={`/chats/${props.Id}`} />
    }

    return(
        <FormLogIn onSubmit={LogInToChat}>
            <div>
                <span>Chat</span>
            </div>
            <div>
                <input type="text" placeholder="Nickname" onChange={(e) => SetUserByKey("Login", e.target.value)} required={true} />
            </div>
            {
                props.IsPassword &&
                <div>
                    <input type="password" placeholder="Password" onChange={(e) => SetUserByKey("Password", e.target.value)} required={true} />
                </div>
            }
            <div>
                <button>Log in</button>
            </div>
        </FormLogIn>
    );
}

export default LogIn;