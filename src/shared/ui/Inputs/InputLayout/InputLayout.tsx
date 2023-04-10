import {FC, ReactNode} from 'react'

import s from './InputLayout.module.scss'
import {ChangeHandler} from "react-hook-form";
import {ElementSize, ElementWidth} from "../../../types";
import {addPrefix, cn} from "../../../lib";

export interface IBaseInputProps {
    error?: string
    label?: string
    width?: ElementWidth
    size?: ElementSize
    placeholder?: string
    textAlign?: 'center' | 'start' | 'end'
}
interface IProps extends IBaseInputProps {
    children: ReactNode

}
export const InputLayout: FC<IProps> = ({
    error, label, width = 'full', children, size = 'medium'
}) => {
    return <div className={cn(
        s.input_wrapper,
        addPrefix('width', width, s),
        addPrefix('size', size, s),
        error && s.has_error
    )}>
        { label &&  <div className={s.label_wrapper}>{ label }</div>}
        { children }
        { error && <div className={s.error_wrapper}>{error}</div> }
    </div>
}
