import React, {FC} from 'react'

import s from './TextArea.module.scss'
import styled from "styled-components";

interface IProps {
    value: string
    maxLength?: number
    onChange: Function
}

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  min-height: 120px;
  background: var(--clr-grey-light);
  border-radius: var(--brd-radius-2);
  border: none;
  box-sizing: border-box;
`

export const TextArea: FC<IProps> = ({
                                         value,
                                         maxLength,
                                         onChange
                                     }) => {
    const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value
        if (!maxLength || text.length <= maxLength) {
            onChange(text)
        }
    }
    return <StyledTextArea value={value}
                     onChange={onTextAreaChange}
                     className={s.textarea}/>
}
