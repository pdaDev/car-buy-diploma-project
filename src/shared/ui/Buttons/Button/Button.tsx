import {FC, MouseEventHandler, ReactNode, useState} from "react";
import './Button.module.scss';
import s from './Button.module.scss'
import {addPrefix, addRipple, cn, getPercents, RippleEffectProp} from "../../../lib";
import {ElementColor, ElementWidth} from "../../../types";
interface IProps extends RippleEffectProp{
    size?: 'small' | 'medium' | 'large';
    label?: string;
    type: 'primary' | 'secondary'
    disabled?: boolean;
    onClick?: (...args: any[]) => void;
    width?: ElementWidth
    children?: ReactNode
    color?: ElementColor | 'vk' | 'google'
}

export const Button: FC<IProps> = (
    {
        type,
        size= 'medium',
        label,
        disabled = false,
        onClick,
        width= 'auto',
        children,
        withRippleEffect= true,
        color

    }) => {
    const onButtonClick: MouseEventHandler = e => {
        onClick && onClick()

        if (withRippleEffect) {
            addRipple(e)
        }
    }


    return <button onClick={onButtonClick}
                   disabled={disabled}
                   type={'submit'}
                   style={{ width: width }}
                   className={cn(
                       s.wrapper,
                       addPrefix('type', type, s),
                       addPrefix('size', size, s),
                       addPrefix('width', width, s),
                       color && addPrefix('color', color, s)
                   )}>
        {label}{children}
    </button>
}