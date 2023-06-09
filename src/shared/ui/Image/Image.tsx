import {FC} from 'react'

import s from './Image.module.scss'
import styled from "styled-components";
import {useAppDispatch} from "../../../../../car-buy/src/app/services";
import {openModal} from "../../../../../car-buy/src/app/services/withPopupProvider";
// @ts-ignore
import template from './template.png'

interface IProps {
    src: string | null
    alt: string
    width?: string | '100%' | 'auto'
    height?: string | '100%' | 'auto'
    onClick?: Function
    fit?: 'contain' | 'cover'
}

const StyledImage = styled.img<IProps>`
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  object-fit: ${p => p.fit};
  cursor: pointer;
`
export const Image: FC<IProps> = ({src, onClick, fit = 'contain', ...props}) => {
    const d = useAppDispatch()
    const handleClick = () => {
        if (onClick) {
            onClick()
        } else {
            if (src) {
                d(openModal({
                    key: 'image', payload: {
                        currentImageIndex: 0,
                        images: [src]
                    }
                }))
            }

        }
    }
    return <StyledImage onClick={handleClick} fit={fit} src={src || template} {...props}/>
}
