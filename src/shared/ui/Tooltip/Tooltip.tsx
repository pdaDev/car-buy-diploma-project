import {FC, MouseEventHandler, ReactNode, useEffect, useLayoutEffect, useRef, useState} from 'react'
import s from './Tooltip.module.scss'
import {addPrefix, cn, debounce} from "../../lib";
import {AutoPosedComponent} from "../AutoPosedComponent/AutoPosedComponent";
import {Pos, Position, PosType} from "../../types";

interface IProps<T extends PosType | never> {
    children: ReactNode
    text: string
    position: Position<T>
    time?: number
}

export function Tooltip<T extends PosType>({children, text, position, time}: IProps<T>) {
    const [open, setOpen] = useState<boolean>(false)
    const timer = useRef<any>(0)
    const debouncedTime = 100

    const onMouseOver: MouseEventHandler<HTMLDivElement> = e => {
        if (!open) {
            if (time) {
                // @ts-ignore
                timer.current = setTimeout(() => setOpen(true), Math.max(time - debouncedTime, 0))
            } else {
                setOpen(true)
            }
        }
    }
    const onMouseLeave: MouseEventHandler<HTMLDivElement> = e => {
        if (open) {
            // @ts-ignore
            timer.current = setTimeout(() => {
                setOpen(false)
            }, 50)
        } else {
            clearTimeout(timer.current)
            setOpen(false)
        }
    }
    const debouncedMouseOver = debounce(onMouseOver, debouncedTime)
    const debouncedMouseLeave = debounce(onMouseLeave, debouncedTime)
    const onTooltipMouseOver = () => {
        clearTimeout(timer.current)
    }

    return <AutoPosedComponent position={position}
                               mounted={open}
                               onMouseOver={debouncedMouseOver as any}
                               onMouseLeave={debouncedMouseLeave as any}
                               Component={(p: Pos) => {
                                  return <div
                                       onMouseOver={onTooltipMouseOver}
                                       className={cn(
                                           s.tooltip,
                                           addPrefix('tooltip', p, s))}
                                   >
                                       {text}
                                   </div>
                               }}>
        { children }
    </AutoPosedComponent>

}