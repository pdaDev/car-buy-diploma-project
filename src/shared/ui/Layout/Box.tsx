import {FC, MouseEventHandler, ReactNode} from "react";
import styled, {css} from "styled-components";
import {Color} from "../../types";
import s from './Layout.module.scss'
import {addLoadingEffectToStyleComponent} from "../../lib";
interface IProps {
    children: ReactNode
    brd?: 1 | 2 | 3
    background?: Color
    measure?: '%' | 'px'
    w?: number | string
    h?: number | string
    mw?: number | string
    mh?: number | string
    shadow?: 1 | 2
    figure?: "square" | 'circle' | 'none'
    selective?: boolean
    onClick?: Function;
    loading?: boolean
    brdWidth?: number
    brdColor?: Color
}


const getSize = (s: string | number | undefined, m: string | undefined) => {
    if (s === undefined)
        return '100%'
    return typeof s === 'string'
        ? s
        : `${s}${m}`
}

const StyledBox = styled.div<Omit<IProps, 'selective' | 'onClick'>>`
  display: inline-block;
  box-sizing: border-box;
  border-radius: ${props => props.brd && `var(--brd-radius-${props.brd})`};
  background: ${props => props.background && `var(--clr-${props.background})`};
  width: ${props => getSize(props.w, props.measure)};
  height: ${props => props.h ? getSize(props.h, props.measure) : 'auto'};
  max-width: ${props => getSize(props.mw, props.measure)};
  max-height: ${props => getSize(props.mh, props.measure)};
  box-shadow: ${props => props.shadow && `var(--shadow-${props.shadow})`};
  border-color: var(--clr-${props => props.brdColor || 'grey-1'});
  border-width: ${props => props.brdWidth || 0}px;
  ${(props) => {
    if (props.figure)
      switch (props.figure) {
        case 'square':
          return css`
            width: ${getSize(props.w, props.measure)};
            height: ${getSize(props.w, props.measure)};
            border-radius: 0;
          `
        case 'circle':
          return css`
            width: ${getSize(props.w, props.measure)};
            height: ${getSize(props.w, props.measure)};
            border-radius: 50%;
          `
      }
  }}
  ${props => addLoadingEffectToStyleComponent(props.loading)}
`

export const Box: FC<IProps> = ({
                                    children,
                                    measure = '%',
                                    selective,
                                    onClick,
                                    loading,
                                    ...props
                                }) => {
    const ti = selective ? {
        tabIndex: 0
    } : {}
    return <StyledBox {...props}
                      measure={measure}
                      onClick={onClick ? onClick as MouseEventHandler : () => {
                      }}
                      {...ti}
    >
        {children}
    </StyledBox>
}