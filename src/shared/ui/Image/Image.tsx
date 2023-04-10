import {FC} from 'react'

import s from './Image.module.scss'
import styled from "styled-components";

interface IProps {
    src: string | null
    alt: string
    width?: string | '100%' | 'auto'
    height?: string | '100%' | 'auto'
    contains?: ''
}

const StyledImage = styled.img<IProps>`
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
`
export const Image: FC<IProps> = ({src, ...props}) => {
    return <StyledImage src={src || ''} {...props}/>
}
