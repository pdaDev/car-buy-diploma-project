import {FC, ReactNode} from "react";
import {Label} from "../../Label/Label";
import s from './InputWrapper.module.scss'

interface IProps {
    title: string | undefined
    error?: string
    children: ReactNode
}
export const InputWrapper: FC<IProps> = ({ title, children, error }) => {
    if (!title) {
        return <>
            {children}
        </>
    }
    return <div className={s.input_wrapper}>
        <Label label={title}
               level={3}
               size={3}
        />
        { children }
        { error && <div className={s.errors_wrapper}>
            { error }
        </div> }
    </div>
}