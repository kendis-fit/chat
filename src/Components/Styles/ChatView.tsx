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
        position: absolute;
        width: 100vw;
        top: 100px;
        display: block;
        border: 0;
        cursor: pointer;
        text-align: center;
        background: ${Colors.Gray};
        height: 40px;
        font-size: 20px;
    }
`;

export const BlockMessages = styled.ul`
    height: calc(100vh - 200px);
    overflow-y: auto;
`;

export const BlockMessage = styled.li`
    padding: 10px;
`;

export const BlockTitleAndData = styled.div`
    display: flex;
    flex-direction: row;

    div {
        width: 100%;
    }

    div:first-child {
        align-self: flex-start;
    }

    div:last-child {
        font-size: 12px;
        color: ${Colors.Gray};
        align-self: flex-end;
        text-align: right;
    }
`;

export const BlockContent = styled.div`
    margin-top: 5px;
    width: 80%;
    word-break: break-all;

    @media screen and (max-width: 460px) {
        width: 100%;
    }
`;

export const BlockSendMessage = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 50px;

    textarea {
        resize: none;
        width: calc(100% - 120px);
        border-radius: 5px;
        border: 2px solid ${Colors.LightGray};

        @media screen and (max-width: 375px) {
            width: 100%;
        }
    }

    button {
        width: 110px;
        @media screen and (max-width: 375px) {
            display: none;
        }
    }

`;