import {FC, MouseEvent, MouseEventHandler, ReactNode} from "react";
import styled, {css} from "styled-components";
import {SpaceLevel} from "../../types";


type Align = 'start' | 'end' | 'center'

interface IProps {
    direction?: 'row' | 'column'
    spacing?: SpaceLevel | string
    vAlign?: Align
    hAlign?: Align
    size?: 'container' | 'content' | 'width' | 'height'
    children: ReactNode
    reverse?: boolean
    onClick?: Function
    scrolled?: boolean
    wrap?: boolean
}

const getSize = (fs: string | undefined, style?: 'width' | 'height') => {
    switch (fs) {
        case 'content':
            return 'auto'
        case 'container':
            return '100%'
        case 'width':
            return style === 'width' ? '100%' : 'auto'
        case 'height':
            return style === 'height' ? '100%' : 'auto'
        default:
            return 'auto'
    }

}

const getAlign = (align: Align | undefined) => {
    switch (align) {
        case 'start':
            return 'flex-start'
        case 'center':
            return 'center'
        case 'end':
            return 'flex-end'
        default:
           return 'space-between'
    }
}

const StyledStack = styled.div<IProps>`
  display: inline-flex;
  box-sizing: border-box;
  overflow: ${props => props.scrolled ? 'scroll' : 'visible'};
  gap: ${props => typeof props.spacing === 'string'
          ? props.spacing
          : `var(--space-${props.spacing || 1})`};
  justify-content: space-between;
  width: ${props => getSize(props.size, 'width')};
  height: ${props => getSize(props.size, 'height')};
  
  ${props => props.size === 'container' && css`
    flex-grow: 1;
  `}
  min-height: ${props => getSize(props.size, 'height')};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
  ${(props) => {
    switch (props.direction || 'column') {
      case 'row':
        return css`
          flex-direction: row${props.reverse ? '-reverse' : ''};
          justify-content: ${getAlign(props.hAlign)};
          align-items: ${getAlign(props.vAlign)};
        `
      case 'column':
        return css`
          flex-direction: column${props.reverse ? '-reverse' : ''};
          justify-content: ${getAlign(props.vAlign)};
          align-items: ${getAlign(props.hAlign)};
        `
    }
  }}

`
export const Stack: FC<IProps> = ({children, onClick, ...props}) => {
    return <StyledStack {...props} onClick={onClick as MouseEventHandler}>
        {children}
    </StyledStack>
}


