import {FC, MouseEventHandler} from "react";
import {addPrefix, cn} from "../../lib";
import styled, {css} from 'styled-components'
import {Box, Container} from "../Layout";

interface IProps {
    direction: 'left' | 'right'
    onClick: MouseEventHandler
}

const NavButtonWrapper = styled.div<IProps>`
  position: absolute;
  z-index: 10;
  top: 50%;
  cursor: pointer;
  box-shadow: var(--shadow-2);
  width: auto;
  height: auto;
  background: red;
  font-weight: var(--fnt-weight-bold);
  display: inline-block;
  ${({direction}) => {
    switch (direction) {
        case 'right':
            return css`
              right: 0;
              transform: translateX(50%) translateY(-50%);
            `
        case 'left':
            return css`
              left: 0;
              transform: translateX(-50%) translateY(-50%) rotate(180deg);
            `
    }
}}
`

export const NavigationButton: FC<IProps> = (props) => {
    return <NavButtonWrapper {...props}>
        <Box w={'35px'}
             background={'primary'}
             shadow={2}
             figure={'circle'}
        >
            <Container contentAlign={'center'}>
                {'>'}
            </Container>
        </Box>
    </NavButtonWrapper>
}