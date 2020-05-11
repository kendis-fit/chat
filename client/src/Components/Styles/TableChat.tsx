import styled from "styled-components";

const TableChat = styled.table`
    width: 1278px;
    margin: 0 auto;
    font-size: 16px;

    th {
        border-bottom: solid gray 2px;
    }

    th, td {
        padding: 10px;
        text-align: center;
    }

    tbody tr {
        cursor: pointer;

        :hover {
            background: #1a78d7;
            color: white;
        }
    }

    @media screen and (max-width: 1278px) {
        width: 780px;
    }

    @media screen and (max-width: 768px) {
        width: 500px;
    }

    @media screen and (max-width: 510px) {
        width: 300px;
        font-size: 14px;
    }
`;

export default TableChat;