import {FC, ReactNode} from 'react'

import s from './Card.module.scss'
import styled, {css} from "styled-components";


type Param = number | string
type Border = 0 | 1 | 2 | 3 | string

interface IProps {
    paddings?: Param | Param[]
    border?: Border | Border[]
    onClick?: Function
    children: ReactNode
    width?: Param | 'auto' | '100%'
    height?: Param | 'auto' | '100%'
    contentDirection?: 'row' | 'column'
    contentGap?: Param
    shadow?: 1 | 2 | 3
    contentAlign?: 'center' | 'top-left' | 'top-middle' | 'top-right' |
        'middle-left' | 'middle-right' | 'bottom-left' |
        'bottom-right' | 'bottom-middle'
}

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


const getSomeValueCreator = (callback: (v: number) => string) => (v: string | number) => {
    if (typeof v === 'string' || v === 0) {
        return v
    }
    return callback(v)
}

const getPaddingValue = getSomeValueCreator(v => `var(--space-${v})`)
const getSizeValue = getSomeValueCreator(v => `${v}px`)
const getBorderValue = getSomeValueCreator(v => `var(--brd-radius-${v})`)

const StyledCard = styled.div<Omit<IProps, 'onClick' | 'children'>>`
  ${({border}) => {
    return Array.isArray(border)
            ? border.length === 4
                    ? css`
                      border-top-left-radius: ${getBorderValue(border[0])};
                      border-top-right-radius: ${getBorderValue(border[1])};
                      border-bottom-right-radius: ${getBorderValue(border[2])};
                      border-bottom-left-radius: ${getBorderValue(border[3])};
                    `
                    : css`border-radius: ${getBorderValue(border[0])};`
            : css`border-radius: ${getBorderValue(border!)};`
  }}
  background: var(--clr-secondary);
  width: ${props => getSizeValue(props.width!)};
  height: ${({height}) => getSizeValue(height!)};
  padding: ${({paddings}) => Array.isArray(paddings) ? paddings.map(getPaddingValue) : getPaddingValue(paddings!)};
  display: inline-flex;
  box-shadow: var(--shadow-${props => props.shadow});
  flex-direction: ${props => props.contentDirection};
  justify-content: space-between;
  gap: ${props => props.contentGap || 0}px;
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
  }}
`

export const Card: FC<IProps> = ({
                                     onClick,
                                     children,
                                     border = 2,
                                     width = 'auto',
                                     height = 'auto',
                                     contentDirection = 'row',
                                     shadow = 2,
                                     paddings = 3,
                                     ...props
                                 }) => {
    return <StyledCard border={border}
                       shadow={shadow}
                       paddings={paddings}
                       contentDirection={contentDirection}
                       tabIndex={0}
                       width={width}
                       height={height}
                       {...props}
                       onClick={() => onClick && onClick()}>
        {children}
    </StyledCard>
}
