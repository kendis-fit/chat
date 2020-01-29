import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useFormik, FormikValues } from "formik";

import ChatApi from "../../Api/ChatApi";
import ILogin from "./Interfaces/ILogin";
import { FormLogIn } from "./LogInStyle";
import ILogInProps from "./Interfaces/ILogInProps";
import CreateConnection from "../../Helpers/CreateConnection";

const LogIn = (props: ILogInProps) => {
    
    const [isSubmited, setIsSubmited] = useState(false);

    const formik = useFormik({
        initialValues: {
            Login: "",
            Password: ""
        },
        onSubmit: values => LogInToChat(values)
    });

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
        <FormLogIn onSubmit={formik.handleSubmit}>
            <div>
                <span>Chat</span>
            </div>
            <div>
                <input type="text" name="Login" placeholder="Nickname" onChange={formik.handleChange} value={formik.values.Login} required={true} />
            </div>
            {
                props.IsPassword &&
                <div>
                    <input type="password" name="Password" placeholder="Password" onChange={formik.handleChange} value={formik.values.Password} required={true} />
                </div>
            }
            <div>
                <button>Log in</button>
            </div>
        </FormLogIn>
    );
}

export default LogIn;