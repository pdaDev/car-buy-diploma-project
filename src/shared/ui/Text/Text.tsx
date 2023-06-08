import React, {FC, ReactNode} from 'react'

import s from './Text.module.scss'
import styled, {css} from 'styled-components'
import {Color, FontWeight, SpaceLevel} from "../../types";
import {addLoadingEffectToStyleComponent} from "../../lib";
import {LoadingEl} from "../Layout/LoadedEl";

interface IProps {
    content?: string | null
    size?: SpaceLevel
    color?: Color
    loading?: boolean
    children?: ReactNode
    weight?: FontWeight
    lineHeight?: string
    align?: 'left' | 'center' | 'right'
}


const StyledText = styled.p<Omit<IProps, 'content'>>`
  line-height: ${props => props.lineHeight};
  font-size: var(--fnt-size-${props => props.size || 2});
  padding: 0;
  margin: 0;
  font-weight: var(--fnt-weight-${props => props.weight});
  box-sizing: border-box;
  color: var(--clr-${props => props.color || 'fnt-primary'});
  ${props => addLoadingEffectToStyleComponent(props.loading)};
  text-align: ${props => props.align || 'left'};
  ${props => props.loading && css`
    width: 100%;
    height: 100%;
    border-radius: var(--brd-radius-2);
  `}
`

export const Text: FC<IProps> = ({
                                     content, loading, children, ...props
                                 }) => {
    const loadingStatus = loading ?? (content === undefined ? !children : !content)
    return !loadingStatus ? <StyledText loading={loadingStatus}
                       {...props}
    >
        { children || content }
    </StyledText> : <div className={s.loading} data-loading={loadingStatus}/>
}


