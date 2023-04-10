import {FC, MouseEventHandler} from 'react'

import s from './ThreeDotsButton.module.scss'
import {ElementSize} from "../../../types";
import {addPrefix, addRipple, cn, RippleEffectProp} from "../../../lib";
import {ThreeDots} from "../../icons";

interface IProps extends RippleEffectProp{
    onClick: Function
    size?: ElementSize
    disabled?: boolean
    color?: 'primary' | 'secondary'
}
export const ThreeDotsButton: FC<IProps> = ({
    onClick,
    disabled= false,
    size = 'medium',
    color = 'primary',
    withRippleEffect = true
}) => {
    const onButtonClick: MouseEventHandler = e => {
        onClick()

        if (withRippleEffect) {
            addRipple(e)
        }
    }
    return <button className={cn(
        s.dotes_button,
        addPrefix('size', size, s),
        addPrefix('color', color, s)
    )}
                   onClick={onButtonClick}
                   disabled={disabled}
    >
        <img src={ThreeDots} alt="dots"/>
    </button>
}
