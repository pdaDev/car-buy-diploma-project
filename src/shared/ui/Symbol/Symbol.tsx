import { FC } from 'react'
import {Color, FontWeight, SpaceLevel} from "../../types";
import styled from "styled-components";

interface IProps {
    size?: SpaceLevel
    color?: Color
    content: string | number | null
    weight?: FontWeight
    width?: 'auto' | '100%'

}

const StyledSymbol = styled.span<Omit<IProps, 'content'>>`
  color: var(--clr-${props => props.color || 'fnt-primary'});
  font-size: var(--fnt-size-${props => props.size || 3});
  font-weight: var(--fnt-weight-${props => props.weight || 'medium'});
  width: ${props => props.width || 'auto'};
`
export const Symbol: FC<IProps> = ({
    content, ...props
}) => {
    return <StyledSymbol {...props}>{content}</StyledSymbol>
}
