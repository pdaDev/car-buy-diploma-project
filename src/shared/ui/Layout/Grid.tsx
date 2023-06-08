import React, {FC, ReactNode} from "react";

import styled, {css} from 'styled-components'
import {SpaceLevel} from "../../types";


interface IProps {
    cols?: number
    rows?: number
    container?: boolean
    gap?: SpaceLevel | SpaceLevel[]
    children: ReactNode
    cellSizes?: ('auto' | '100%' | string | '1fr')[]
    size?: 'container' | 'content'
}

const StyledGrid = styled.div<Omit<IProps, 'children'>>`
  width: 100%;
  ${props => props.container && css`
    display: grid;
    grid-template-columns: repeat(${props.cols || 1}, ${props.cellSizes ? props.cellSizes[0] : '1fr'} );
    grid-auto-rows: repeat(${props.rows || 1},  ${props.cellSizes ? props.cellSizes[1] : '1fr'});
  `};
  ${props => props.container && css`
    & > div{
      align-self: center;
      justify-self: center;
    }
  `}
  ${({gap, container}) => {
    if (container && gap) {
      const isArray = Array.isArray(gap)
      if (!isArray)
        return css`
          row-gap: var(--space-${gap});
          column-gap: var(--space-${gap});
        `
      return css`
        column-gap: ${gap[1] ? `var(--space-${gap[1]}})` : 0};
        row-gap: ${gap[0] ? `var(--space-${gap[0]})`: 0};
      `
    }
  }}
  ${props => {
      switch (props.size) {
        case 'container':
                  return css`
                    width: 100%;
                    height: 100%;
                  `
        case 'content':
            return css`
              width: auto;
              height: auto;

            `
        default:
            return 
      }
  }}
`

export const Grid: FC<IProps> = React.forwardRef(({
                                                      children, ...props
                                                  }, ref) => {
    // @ts-ignore
    return <StyledGrid {...props} ref={ref}>
        {children}
    </StyledGrid>
})