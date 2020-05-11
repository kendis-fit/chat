import styled from "styled-components";

import ISize from "./Interfaces/ISize";
import IFlex from "./Interfaces/IFlex";

export const BlockCenter = styled.div<ISize>`
    margin: 0 auto;
    width: ${props => props.Width};
    height: ${props => props.Height};
`;

export const FlexBlock = styled.div<IFlex>`
    display: flex;
    flex-direction: ${props => props.FlexDirection};
`;