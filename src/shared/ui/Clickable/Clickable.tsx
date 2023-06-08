import {FC, ReactNode} from 'react'

import s from './Clickable.module.scss'
import {Color} from "../../types";
import styled, {css} from "styled-components";

interface IProps {
    children: ReactNode
    onClick: Function
    color?: Color
}


const StyledClickable = styled.span<{ color?: Color }>`
  cursor: pointer;
  width: auto;
  height: auto;
  display: inline-flex;
  align-items: center;

  ${props => props.color && css`
    svg {
      color: var(--clr-${props.color});
    }
  `}
`
export const Clickable: FC<IProps> = ({
                                          children,
                                          onClick,
                                          color
                                      }) => {
    return <StyledClickable tabIndex={0}
                            color={color}
                            onClick={onClick as any}>
        {children}
    </StyledClickable>
}
