import React, {FC} from 'react'

import s from './TextArea.module.scss'
import styled from "styled-components";
import {InputWrapper} from "../Inputs";
import {Text} from "../Text/Text";
import {Separator} from "../Separator/Separator";
import {Stack} from "../Layout";
import {Symbol} from "../Symbol/Symbol";

interface IProps {
    value?: string
    maxLength?: number
    onChange?: Function
    register?: Object
    title?: string
    error?: undefined | string
}

const StyledTextArea = styled.div`
  width: 100%;
  height: 100%;

  min-height: 120px;
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);

  
  textarea {
    height: 100%;
    color: var(--clr-fnt-primary);
    background: transparent;
    border: none;
    flex-grow: 1;
    font-weight: var(--fnt-weight-regular);
    font-family: "Inter", serif;
    font-size: var(--fnt-size-3);
    
    &:focus {
      outline: none;
    }
    
    resize: vertical;
  }

  &:focus {
    outline: none;
  }

  background: var(--clr-grey-light);
  border-radius: var(--brd-radius-2);
  border: none;
  box-sizing: border-box;
`

export const TextArea: FC<IProps> = ({
                                         value,
                                         maxLength,
                                         onChange,
                                         register,
                                         title
                                     }) => {
    const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            const text = e.target.value
            if (!maxLength || text.length <= maxLength) {
                onChange(text)
            }
        }
    }


    return <InputWrapper title={title}>
        <StyledTextArea >
        <textarea value={value}
                  onChange={onTextAreaChange}
                  {...register}
        />
            { maxLength && <>
                <Separator thickness={'thin'}/>
                <Stack direction={'row'} hAlign={'end'} size={'width'}>
                    <Symbol content={`${value?.length} / ${maxLength}`}
                            weight={'regular'}
                            size={3}
                            color={'grey-1'}
                    />
                </Stack>
            </>}
        </StyledTextArea>
    </InputWrapper>

}
