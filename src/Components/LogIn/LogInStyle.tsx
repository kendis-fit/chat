import styled from "styled-components";

import Colors from "../../Constants/Colors";
import IPosition from "../Styles/Interfaces/IPosition";

export const ModalLogIn = styled.div<IPosition>`

    position: absolute;
    top: ${props => props.Y};
    left: ${props => props.X};

    width: 250px;

    border-radius: 2px;
    background: ${Colors.LightGray};
`;

export const FormLogIn = styled.form`

    display: flex;
    flex-direction: column;
    align-items: center;

    div:first-child {
        padding: 10px;
    }

    div:not(:first-child) {
        padding-bottom: 10px;
    }

    div span { /* chat name */
        color: white;
        font-size: 18px;
    }

    div button { /* chat login */
        cursor: pointer;
        width: 160px;
    }

    div input { /* chat data(login, password) */
        width: 150px;
        border: 0;
        padding: 5px;
    }
`;