import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Formik, Field, FormikValues } from "formik";

import ChatApi from "../../Api/ChatApi";
import ILogin from "./Interfaces/ILogin";
import { FormLogIn } from "./LogInStyle";
import ILogInProps from "./Interfaces/ILogInProps";
import CreateConnection from "../../Helpers/CreateConnection";

const initialValues: ILogin = {
    Id: "",
    Login: ""
}

const LogIn = (props: ILogInProps) => {
    
    const [isSubmited, setIsSubmited] = useState(false);

    const LogInToChat = async (values: FormikValues) => {

        let clientConnection: SocketIOClient.Socket | undefined;
        try
        {
            clientConnection = await CreateConnection();
            await ChatApi.LoginToChat(props.Id, {...values, Id: clientConnection.id} as ILogin);
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
        <Formik initialValues={initialValues} onSubmit={LogInToChat}>
            <FormLogIn>
                <div>
                    <span>Chat</span>
                </div>
                <div>
                    <Field type="text" name="Login" placeholder="Nickname" required={true} />
                </div>
                {
                    props.IsPassword &&
                    <div>
                        <Field type="password" name="Password" placeholder="Password" required={true} />
                    </div>
                }
                <div>
                    <button>Log in</button>
                </div>
            </FormLogIn>
        </Formik>
    );
}

export default LogIn;