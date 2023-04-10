import { FC } from 'react'

import s from './Details.module.scss'
import styled from 'styled-components'
import {useOpenStatus} from "../../lib";
interface IProps {
    isOpen: boolean
}

const StyledWrapper = styled.div<IProps>`
  height: 100%;
  min-height: ${props => props.isOpen ? 'auto' : '2000px'};
`
export const Details: FC<IProps> = ({
}) => {
    const [open, _, toggle] = useOpenStatus()

    return <StyledWrapper isOpen={open}>
        <div></div>
    </StyledWrapper>
}
