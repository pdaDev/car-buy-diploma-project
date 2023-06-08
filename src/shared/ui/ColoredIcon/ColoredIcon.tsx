import {FC, ReactNode} from 'react'

import s from './ColoredIcon.module.scss'
import {Color} from "../../types";
import styled from "styled-components";

interface IProps {
    color: Color
    children: ReactNode
}

const StyledColor = styled.span<IProps>`
  color: var(--clr-${props => props.color});
  display: inline-flex;
  justify-content: center;
  align-items: center;
`
export const ColoredIcon: FC<IProps> = ({
    color,
    children
}) => {
    return <StyledColor color={color}>
        { children }
    </StyledColor>
}
