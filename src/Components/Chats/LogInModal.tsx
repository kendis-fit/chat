import React from "react";

import LogIn from "./LogIn";
import { ModalLogIn } from "./LogInStyle";
import IPosition from "../Styles/Interfaces/IPosition";

const LogInModal = (props: IPosition) => {
    
    return(
        <ModalLogIn {...props}>
            <LogIn />
        </ModalLogIn>
    );
}

export default LogInModal;