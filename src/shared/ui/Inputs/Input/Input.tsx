import {FC} from 'react'

import {IBaseInputProps, InputLayout} from "../InputLayout/InputLayout";

type Value = string | number

interface IProps extends IBaseInputProps {
    type?: 'text' | 'password' | 'number'
    value?: Value;
    onChange?: (value: string | number) => void
    register?: Object
    onKeyDown?: Function

}

export const Input: FC<IProps> = ({

                                      value,
                                      onChange,
                                      register,
                                      placeholder,
                                      type = 'text',
                                      onKeyDown,
                                      ...props

                                  }) => {
    const registerObject = register || {}
    return <InputLayout {...props}>
        <input value={value}
               type={type}
               onKeyDown={e => onKeyDown && onKeyDown(e)}
               placeholder={placeholder}
               {...registerObject}
               onChange={e => onChange && onChange(e.target.value as any)}/>
    </InputLayout>
}
