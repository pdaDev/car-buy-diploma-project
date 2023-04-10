import React, {FC, ReactNode} from 'react'

import s from './Text.module.scss'
import styled from 'styled-components'
import {SpaceLevel} from "../../types";
import {addLoadingEffectToStyleComponent} from "../../lib";

interface IProps {
    content?: string | null
    size?: SpaceLevel
    color?: 'primary' | 'secondary' | 'grey-1' | 'grey-light' | 'fnt-primary'
    loading?: boolean
    children?: ReactNode
    align?: 'left' | 'center' | 'right'
}


const StyledText = styled.p<Omit<IProps, 'content'>>`
  font-size: var(--fnt-size-${props => props.size || 2});
  color: var(--clr-${props => props.color});
  ${props => addLoadingEffectToStyleComponent(props.loading)};
  text-align: ${props => props.align || 'left'};
`

export const Text: FC<IProps> = ({
                                     content, loading, children, ...props
                                 }) => {
    const loadingStatus = loading ?? (content === undefined ? !children : !content)
    return <StyledText loading={loadingStatus}
                       {...props}
    >
        {children || content}
    </StyledText>
}
