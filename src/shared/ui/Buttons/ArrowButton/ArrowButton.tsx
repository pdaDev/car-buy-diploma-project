import {FC, MouseEventHandler} from 'react'

import s from './ArrowButton.module.scss'
import {ElementSize} from "../../../types";
import {addPrefix, addRipple, cn, RippleEffectProp} from "../../../lib";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;

interface IProps extends RippleEffectProp {
    size: ElementSize;
    direction: 'left' | 'right' | 'up' | 'down';
    onClick: Function
}

export const ArrowButton: FC<IProps> = ({
                                            size,
                                            direction,
                                            onClick,
                                            withRippleEffect = true
                                        }) => {
    const onButtonClick: MouseEventHandler = e => {
        onClick()

        if (withRippleEffect) {
            addRipple(e)
        }
    }
    return <div className={cn(
        s.arrow_button_wrapper,
        addPrefix('size', size, s),
        addPrefix('direction', direction, s)
    )}
                onClick={onButtonClick}
    >
        <span>{'>'}</span>
    </div>
}
