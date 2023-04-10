import {FC, useEffect, useState} from 'react'
import Icon from '@mdi/react';
import {mdiAccount, mdiEye, mdiEyeOutline, mdiEyeRemoveOutline} from '@mdi/js';

import s from './PasswordInput.module.scss'
import {IBaseInputProps, InputLayout} from "../InputLayout/InputLayout";


interface IProps extends IBaseInputProps{
    register?: Object
    value?: string
    onChange?: (value: string) => void
    needShowPassword?: boolean
}
export const PasswordInput: FC<IProps> = ({
    register, value, onChange, needShowPassword, placeholder, ...props

}) => {
    const registerObject = register || {}
    const [type, setType] = useState<'password' | 'text'>('password')

    const showPassword = () => setType('text')
    const hidePassword = () => setType('password')
    useEffect(() => {
        if (needShowPassword) {
            showPassword()
        }
    }, [needShowPassword])

    const isPasswordVisible = type === 'text'
    return <InputLayout {...props}>
        <div className={s.input_wrapper} placeholder={placeholder}>
            <input type={type} {...registerObject}/>
            <div className={s.hide_button}
                 onPointerDown={showPassword}
                 onPointerUp={hidePassword}
            >
                <Icon path={isPasswordVisible ? mdiEyeRemoveOutline : mdiEyeOutline} color={'#D9D9D9'}/>
            </div>
        </div>
    </InputLayout>
}
