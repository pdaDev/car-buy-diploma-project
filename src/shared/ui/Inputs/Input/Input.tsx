
import { FC } from 'react'

import {IBaseInputProps, InputLayout} from "../InputLayout/InputLayout";

type Value = string | number
interface IProps extends IBaseInputProps {
    type?: 'text' | 'password' | 'number'
    value?: Value;
    onChange?: (value: string | number) => void
    register?: Object

}

export const Input: FC<IProps> = ({
    value, onChange, register, placeholder, type = 'text', ...props

}) => {
    const registerObject = register || {}
    return <InputLayout {...props}>
        <input value={value}
               type={type}
               placeholder={placeholder}
               {...registerObject}
               onChange={e => onChange && onChange(e.target.value as any)} />
    </InputLayout>
}
