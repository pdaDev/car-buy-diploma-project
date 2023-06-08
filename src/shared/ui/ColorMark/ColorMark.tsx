import {FC, MouseEventHandler} from 'react'

import s from './ColorMark.module.scss'
import {IColor} from "../../types";
import {cn, useMultiLanguageHandbooks} from "../../lib";
import Icon from "@mdi/react";
import {mdiCheck} from "@mdi/js/commonjs/mdi";
import styled, {css} from "styled-components";
import {Tooltip} from "../Tooltip/Tooltip";

interface IProps {
    selected?: boolean
    onClick?: Function
    name: string
    color: string
}

export const Color = styled.div<Pick<IProps, 'color'> & { selected: boolean }>`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--clr-grey-1);
  border-radius: 50%;
  background: ${props => props.color};
  cursor: pointer;

  ${props => props.selected && css`
    border-color: var(--clr-primary);

    svg {
      color: var(--clr-primary);
    }
  `}

}
`

export const ColorMark: FC<IProps> = ({
                                          selected = false,
                                          color,
                                          onClick,
                                          name
                                      }) => {

    return <Tooltip text={name} position={'down'}>
        <Color selected={selected}
               color={color}
               onClick={onClick && onClick as MouseEventHandler}
        >
            {
                selected && <Icon size={0.8}
                                  path={mdiCheck}
                />
            }
        </Color>
    </Tooltip>
}
