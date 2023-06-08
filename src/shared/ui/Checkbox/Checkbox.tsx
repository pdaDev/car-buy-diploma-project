import {FC} from 'react'

import s from './Checkbox.module.scss'
import {Label} from "../Label/Label";
import {Register} from "../../lib";

interface IProps {
    checked?: boolean
    onChange?: Function
    title: string
    register?: Register
    error?: string
}

export const Checkbox: FC<IProps> = ({
                                         checked,
                                         onChange,
                                         title,
                                         register
                                     }) => {
    const registerObject = register || {}
    return <label className={s.custom_checkbox_wrapper}>
        <input type={'checkbox'}
               {...registerObject}
               checked={checked}
               onChange={e => {
                   onChange && onChange(e.target.checked)
                   register && register.onChange({
                       target: {
                           value: e.target.checked,
                           name: register.name
                       }
                   })
               }}
        />
        <div className={s.custom_checkbox}/>
        <Label label={title} level={3} type={'secondary'} weight={'medium'}/>
    </label>
}
