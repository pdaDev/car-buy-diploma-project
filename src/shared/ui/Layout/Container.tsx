import {FC, ReactNode} from "react";
import styled, {css} from "styled-components";
import {SpaceLevel} from "../../types";

type Padding = SpaceLevel | string
interface IProps {
    children: ReactNode
    p?: Padding | Padding[]
    pt?: Padding
    pb?: Padding
    pr?: Padding
    zi?: number
    pl?: Padding
    mt?: Padding
    ml?: Padding
    mr?: Padding
    mb?: Padding
    m?: Padding[] | Padding
    max_w?: string;
    max_h?: string
    min_w?: string
    min_h?: string
    h?: string
    w?: string
    size?: 'content' | 'container' | 'width'
    pointerEventsNone?: boolean
    contentAlign?: 'center' | 'top-left' | 'top-middle' | 'top-right' | 'middle-left' | 'middle-right' | 'bottom-left' | 'bottom-right' | 'bottom-middle'
    position?: 'center' | 'top-left' | 'top-middle' | 'top-right' | 'middle-left' | 'middle-right' | 'bottom-left' | 'bottom-right' | 'bottom-middle' | 'none'
}

const setSpace = (v: number | string | undefined) => v ? typeof v === 'string' ? v : `var(--space-${v})` : null
const getAlign = (align: string) => {
    if (['right', 'bottom'].includes(align))
        return 'end'
    if (['left', 'top'].includes(align))
        return 'start'
    return 'center'
}
const getFlexAlign = (align: string) => {
    const fa = getAlign(align)
    return fa === 'center' ? fa : `flex-${fa}`
}

const getPosByName = (pos: string) => {
    if (['right', 'bottom'].includes(pos))
        return 100
    if (['left', 'top'].includes(pos))
        return 0
    return 50
}
const setPercent = (v: number) => v + '%'



const StyledContainer = styled.div<IProps>`
  position: relative;
  box-sizing: border-box;
  padding: ${({p}) => Array.isArray(p) ? p.map(v => setSpace(v)) : setSpace(p)};
  padding-left: ${props => setSpace(props.pl)};
  padding-bottom: ${props => setSpace(props.pb)};
  padding-top: ${props => setSpace(props.pt)};
  padding-right: ${props => setSpace(props.pr)};
  margin: ${({m}) => Array.isArray(m) ? m.map(v => setSpace(v)) : setSpace(m)};;
  margin-top: ${props => setSpace(props.mt)};
  margin-left: ${props => setSpace(props.ml)};
  margin-bottom: ${props => setSpace(props.mb)};
  margin-right: ${props => setSpace(props.mr)};
  z-index: ${props => props.zi || 0};
  pointer-events: ${props => props.pointerEventsNone ? 'none' : 'auto'};
  
  ${({size, w, h}) => {
      switch (size) {
        case 'content': 
            return css`
              width: ${w || 'auto'};
              flex-grow: 0;
              height: ${h || 'auto'};
            `
        case 'container':
            return css`
              width: ${w || '100%'};
              flex-grow: 1;
              height: ${h || '100%'};
              
            `
        case 'width':
            return css`
              width: ${w || '100%'};
              flex-grow: 0;
              height: ${h || 'auto'};
            `
      }
  }};
  
  
  max-height: ${props => props.max_h || 'unset'};
  max-width: ${props => props.max_w || 'unset'};
  min-height: ${props => props.min_h || 'unset'};
  min-width: ${props => props.min_w || 'unset'};
  
  display: flex;
  ${({position}) => {
    if (position) {
      if (position === 'center')
        return css`
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        `
      const [va, ha] = position.split('-')
      return css`
        position: absolute;
        top: ${setPercent(getPosByName(va))};
        left: ${setPercent(getPosByName(ha))};
        transform: translate(${setPercent(-getPosByName(ha))}, ${setPercent(-getPosByName(va))});
      `
      
    }
  }
  }
  ${({contentAlign}) => {
    if (contentAlign) {
      if (contentAlign === 'center')
        return css`
          justify-content: center;
          align-items: center;
        `
      const [va, ha] = contentAlign.split('-')
      return css`
        justify-content: ${getFlexAlign(ha)};
        align-items: ${getFlexAlign(va)};
      `
    }
  }
  }
`

export const
    Container: FC<IProps> = ({
                                          children,
    size = 'container',
                                          ...props
                                      }) => {
    return <StyledContainer {...props} size={size}>
        {children}
    </StyledContainer>
}