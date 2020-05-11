import React from "react";

import { ModalLogIn } from "./LogInStyle";
import LogInContainer from "../../Containers/LogInContainer";
import IPosition from "../Styles/Interfaces/IPosition";

const LogInModal = (props: IPosition) => {
    
    return(
        <ModalLogIn {...props}>
            <LogInContainer />
        </ModalLogIn>
    );
}

export default LogInModal;