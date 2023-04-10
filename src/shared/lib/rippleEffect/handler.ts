import {MouseEvent} from "react";
import {getPercents} from "../commonHelpers";
import s from "./Ripple.module.scss";

export type RippleEffectProp = {
    withRippleEffect?: boolean
}
export const addRipple = (e: MouseEvent) => {
    const sizes = e.currentTarget.getBoundingClientRect()
    const left = getPercents((e.clientX - sizes.x) / sizes.width * 100)
    const top = getPercents((e.clientY - sizes.y) / sizes.height * 100)
    const ripple = document.createElement('span')
    ripple.className = s.ripple
    ripple.style.top = top
    ripple.style.left = left
    e.currentTarget.appendChild(ripple)
    setTimeout(() => ripple.remove(), 1000)
}

