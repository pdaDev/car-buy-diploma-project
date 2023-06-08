import {ChangeEventHandler, FC} from 'react'

import s from './ColorPicker.module.scss'
import {Register} from "../../lib";
import styled from "styled-components";
import {Label} from "../Label/Label";
import {Input, InputWrapper} from "../Inputs";
import {ChangeHandler} from "react-hook-form";
import {Clickable} from "../Clickable/Clickable";
import {ColorItem} from "@storybook/blocks";
import {ColoredIcon} from "../ColoredIcon/ColoredIcon";
import Icon from "@mdi/react";
import {mdiPencil} from "@mdi/js/commonjs/mdi";

interface IProps {
    value: string | null
    onChange?: Function
    register?: Register
    title?: string
    error?: string
}

const StyledColorPicker = styled.label<Pick<IProps, 'value'>>`
  width: 100%;
  max-width: 220px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: var(--space-3);
  background: ${props => props.value || 'var(--clr-grey-light)'};
  position: relative;
  
  label {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  
  input[type='color'] {
    opacity: 0;
    position: absolute;
    bottom: -10px;
    left: 26px;
    transform: translateX(-50%);
  }
`
export const ColorPicker: FC<IProps> = ({
    register,
    value,
    onChange,
    title,
    error
}) => {
    const registerObject = register || {}
    const changeHandlder: ChangeEventHandler<HTMLInputElement> = e => {
        const v = e.target.value
        if (onChange) {
            onChange(v)
        } else if (register){
            register && register.onChange({target: {value: v, name: register.name},})
        }
    }
    return <InputWrapper title={title} error={error}>
        <StyledColorPicker value={value}>
            <Label label={value || 'Выберите цвет'}
                   level={4}
                   type={'primary'}
                   weight={'regular'}/>
                <input type={'color'}
                       {...registerObject} value={value || ''}
                       onChange={changeHandlder}
                />

        </StyledColorPicker>
    </InputWrapper>
}
