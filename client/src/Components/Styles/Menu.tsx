import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Menu = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
    height: 40px;
    font-size: 20px;
`;

export const MenuItem = styled(NavLink)`
    color: white;

    &.active {
        text-decoration: underline;
    }
`;