import styled from "styled-components";

import IShow from "./Interfaces/IShow";
import Colors from "../../Constants/Colors";

export const BlockCenterUsers = styled.div`
    margin: 0 auto;
    width: 50%;

    @media screen and (max-width: 643px) {
        width: 80%;
    }
`;

export const BlockUsers = styled.ul<IShow>`
    background: ${Colors.Gray};
    height: calc(100vh - 105px);
    width: 200px;
    color white;

    li {
        padding: 10px;
    }

    @media screen and (max-width: 643px) {
        ${props => {
            if (props.Show)
            {
                return `
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    position: absolute;
                    width: 100vw;
                    z-index: 5;
                `;
            }
            else
            {
                return `
                    display: none;
                `;
            }
        }}
    }
`;

export const CloseListUsers = styled.li`
    align-self: flex-end;
    cursor: pointer;
`;

export const ButtonShowUsers = styled.button`
    display: none;
    color: white;

    @media screen and (max-width: 643px) {
        display: flex;
        border: 0;
        cursor: pointer;
        align-items: center;
        background: ${Colors.Gray};
        height: 50px;
        width: 50px;
    }
`;

export const BlockMessages = styled.ul`
    height: calc(100vh - 200px);
    overflow-y: auto;

    li { 
        padding: 10px;
    }
`;

export const BlockMessage = styled.div`

`;

export const BlockSendMessage = styled.div`
    display: flex;
    flex-wrap: wrap;

    textarea {
        resize: none;
        width: calc(100% - 120px);
    }
    button {
        width: 110px;
    }
`;