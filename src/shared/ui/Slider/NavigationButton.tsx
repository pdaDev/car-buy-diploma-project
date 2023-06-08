import {FC, MouseEventHandler} from "react";
import {addPrefix, cn} from "../../lib";
import styled, {css} from 'styled-components'
import {Box, Container} from "../Layout";

interface IProps {
    direction: 'left' | 'right'
    onClick: MouseEventHandler
    horizontalOffset: string | number
    show: boolean

}

const getOffset = (props: Omit<IProps, 'show'>, reverse = false) => {
    const offset = props.horizontalOffset
    const isString = typeof offset === 'string'
    if (!reverse) {
        return isString  ? offset : `${offset}px`
    }
    const isNegative = isString ? offset.indexOf('-') : offset < 0
    if (isNegative) {
        return isString ? offset.replace('-', '') : `${Math.abs(offset)}px`
    }
    return  isString ? `-${offset}` : `${-offset}px`

}

const NavButtonWrapper = styled.div<Omit<IProps, 'show'>>`
  position: absolute;
  z-index: 1000;
  top: 50%;
  cursor: pointer;
  user-select: none;
  width: auto;
  display: inline-block;
  height: auto;
  box-shadow: var(--shadow-1);
  font-weight: var(--fnt-weight-bold);
  border-radius: 50%;

  & > div {
    & > div {
      color: var(--clr-primary)
    }
  }


  ${(props) => {
    switch (props.direction) {
      case 'right':
        return css`
          right: 0;
          transform: translateX(50%) translateX(${getOffset(props)}) translateY(-50%);
        `
      case 'left':
        return css`
          left: 0;
          transform: translateX(-50%) translateX(${getOffset(props, true)}) translateY(-50%) rotate(180deg);
        `
    }
  }}
`

export const NavigationButton: FC<IProps> = ({show,  ...props}) => {
    if (show) 
        return (<NavButtonWrapper {...props}>
        <Box w={'35px'}
             background={'secondary'}
             shadow={2}
             figure={'circle'}
        >
            <Container contentAlign={'center'} pl={2}>
                <svg width="8" height="17" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.0322266 19.015L8.04723 11L0.0322266 2.9675L2.49973 0.5L12.9997 11L2.49973 21.5L0.0322266 19.015Z" fill="#FFE12B"/>
                </svg>
            </Container>
        </Box>
    </NavButtonWrapper>)
    return <></>
}