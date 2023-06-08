import {FC, MouseEventHandler, ReactNode, useState} from "react";
import './Button.module.scss';
import s from './Button.module.scss'
import {addPrefix, addRipple, cn, getPercents, RippleEffectProp} from "../../../lib";
import {ElementColor, ElementWidth} from "../../../types";

interface IProps extends RippleEffectProp {
    size?: 'small' | 'medium' | 'large';
    label?: string;
    type: 'primary' | 'secondary' | 'underline' | 'circle' | 'delete'
    disabled?: boolean;
    onClick?: Function
    width?: ElementWidth
    children?: ReactNode
    behaviorType?: 'submit' | 'reset' | 'button'
    color?: ElementColor | 'vk' | 'google'
    classNamePrefix?: string
    loading?: boolean
}

export const Button: FC<IProps> = (
    {
        classNamePrefix,
        type,
        size = 'medium',
        label,
        disabled = false,
        loading,
        onClick,
        width = 'auto',
        behaviorType = 'button',
        children,
        withRippleEffect = true,
        color

    }) => {
    const onButtonClick: MouseEventHandler = e => {
        onClick && !loading && onClick(e)

        if (withRippleEffect && type !== 'underline') {
            addRipple(e)
        }
    }
    const className = classNamePrefix ? cn(`${classNamePrefix}__button`, s.wrapper) : s.wrapper


    return <button onClick={onButtonClick}
                   data-loading={loading}
                   disabled={disabled}
                   type={behaviorType}
                   style={{width: width}}
                   className={cn(
                       className,
                       addPrefix('type', type, s),
                       addPrefix('size', size, s),
                       addPrefix('width', width, s),
                       color && addPrefix('color', color, s)
                   )}>
        {label}{children}
    </button>
}