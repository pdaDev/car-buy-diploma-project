import {FC, MouseEventHandler} from "react";
import s from './CountSetter.module.scss'

interface IProps {
    onClick: Function
    label: string
    disabled: boolean

}

export const IncrementAndDecrementButton: FC<IProps> = ({ onClick, label, disabled }) => {
    return <button onClick={onClick as MouseEventHandler}
                   disabled={disabled}
                   type={'button'}
                   className={s.circle_button}
    >
        { label }
    </button>

}