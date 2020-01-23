import styled from "styled-components";

export const BlockCenterUsers = styled.div`
    margin: 0 auto;
    width: 50%;

    @media screen and (max-width: 643px) {
        width: 80%;
    }
`;

export const BlockUsers = styled.ul`
    background: gray;
    height: calc(100vh - 105px);
    width: 200px;
    color white;

    li {
        padding: 10px;
    }

    @media screen and (max-width: 643px) {
        display: none;
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