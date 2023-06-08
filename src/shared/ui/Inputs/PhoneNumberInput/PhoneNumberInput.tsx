import {FC, useState} from "react";

import {IBaseInputProps, InputLayout} from "../InputLayout/InputLayout";
import {Stack} from "../../Layout";
import {Symbol} from "../../Symbol/Symbol";
import s from './PhoneNumberInput.module.scss'
import {formatPhoneNumber, Register} from "../../../lib";

type Value = string | number

interface IProps extends IBaseInputProps {
    type?: 'text' | 'password' | 'number'
    value?: Value;
    onChange?: (value: string | number) => void
    register?: Register

}

export const PhoneNumberInput: FC<IProps> = ({
                                                 value, onChange, register, placeholder, type = 'text', ...props

                                             }) => {
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        e.target.setSelectionRange(value.length - 1, value.length - 1)
        value = value.replace(/\D/g,'')
        const phoneN = formatPhoneNumber(value, false)
       setTimeout(() => {
           let pos = value.length + 1
           pos = pos > 3 ? pos + 2 : pos
           pos = pos > 8 ? pos + 1 : pos
           pos = pos === 10 ? pos - 1 : pos
           pos = pos === 6 ? pos - 2 : pos
           e.target.setSelectionRange(pos, pos)
           e.target.focus()
       }, 0)
        e.target.blur()
        e.target.value = phoneN
        if (onChange) {
            onChange(value)
        } else if (register) {
            register.onChange({
                target: {
                    value,
                    name: register.name
                }
            })
        }
    }
    return <InputLayout {...props}>
        <Stack direction={'row'} vAlign={'center'} spacing={3}>
            <div className={s.symbol}>
                🇷🇺
                +7
            </div>
            <input type={type}
                   defaultValue={formatPhoneNumber('', false)}
                   // value={formatPhoneNumber((value || '').toString(), false)}
                   placeholder={placeholder}
                   ref={register?.ref}
                   name={register?.name}
                   onBlur={register?.onBlur as any}
                   onChange={onInputChange as any}/>
        </Stack>
    </InputLayout>
}
