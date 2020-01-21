import styled from "styled-components";

import IRequiredField from "./Interfaces/IRequiredField";

export const BlockInputData = styled.div<IRequiredField>`
    margin-top: 25px;

    label::after {
        ${props => {
            if (props.IsRequired) {
                return "content: '*'; color: red;";
            }
        }}
    }

`;

export const BlockSendData = styled.div`
    margin-top: 25px;
    display: flex;
    justify-content: flex-end;
`;