import { FC } from 'react'

import s from './Separator.module.scss'
import {addPrefix, cn} from "../../lib";
import {Label} from "../Label/Label";

export interface IProps {
    text?: string
    thickness?: 'thin' | 'medium' | 'thick'
}
export const Separator: FC<IProps> = ({
    text,
    thickness = 'medium'
}) => {
    return <div className={cn(s.separator_wrapper, addPrefix('thickness', thickness, s))}>
        <div className={cn(s.separator)} />
        { text && <>
       <div className={s.text_wrapper}>{ text }</div>
            <div className={cn(s.separator)}/>
        </>}
    </div>
}
