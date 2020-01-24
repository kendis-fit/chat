import styled from "styled-components";

import IPosition from "../Styles/Interfaces/IPosition";

export const ModalLogIn = styled.div<IPosition>`

    position: absolute;
    top: ${props => props.Y};
    left: ${props => props.X};

    height: 100px;
    width: 100px;
`;