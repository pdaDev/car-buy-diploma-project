import {FC, ReactNode} from "react";

import styled, {css} from 'styled-components'
import {SpaceLevel} from "../../types";


interface IProps {
    cols?: number
    rows?: number
    container?: boolean
    gap?: SpaceLevel | SpaceLevel[]
    children: ReactNode
}

const StyledGrid = styled.div<Omit<IProps, 'children'>>`
  ${props => props.container && css`
    display: grid;
    grid-template-columns: repeat(${props.cols || 1}, 1fr);
    grid-auto-rows: repeat(${props.rows || 1}, 1fr);

  `};
  ${({gap, container}) => {
    if (container && gap) {
      const isArray = Array.isArray(gap)
      if (!isArray)
        return css`
        gap: var(--space-${gap});
      `
      return css`
        column-gap: ${gap[1] ? `var(--space-${gap[1]}})` : 0};
        row-gap: ${gap[0] ? `var(--space-${gap[0]})`: 0};
      `
    }
  }}
`

export const Grid: FC<IProps> = ({
                                     children, ...props
                                 }) => {
    return <StyledGrid {...props}>
        {children}
    </StyledGrid>
}