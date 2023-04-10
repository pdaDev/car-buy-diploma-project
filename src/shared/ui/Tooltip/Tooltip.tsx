import {FC, MouseEventHandler, ReactNode, useEffect, useLayoutEffect, useRef, useState} from 'react'
import s from './Tooltip.module.scss'
import {addPrefix, cn, debounce} from "../../lib";
import {AutoPosedComponent} from "../AutoPosedComponent/AutoPosedComponent";
import {Pos, Position, PosType} from "../../types";

interface IProps<T extends PosType> {
    children: ReactNode
    text: string
    position: Position<T>
    time?: number
}

export function Tooltip<T extends PosType>({children, text, position, time}: IProps<T>) {
    const [open, setOpen] = useState<boolean>(false)
    const [timer, setTimer] = useState(0)
    const onMouseOver: MouseEventHandler<HTMLDivElement> = e => {
        if (!open) {
            if (time) {
                // @ts-ignore
                setTimer(setTimeout(() => setOpen(true), time))
            } else {
                setOpen(true)
            }
        }
    }
    const onMouseLeave: MouseEventHandler<HTMLDivElement> = e => {
        if (open) {
            // @ts-ignore
            setTimer(setTimeout(() => {
                setOpen(false)
            }, 50))
        } else {
            clearTimeout(timer)
            setOpen(false)
        }
    }
    const onTooltipMouseOver = () => {
        clearTimeout(timer)
    }

    return <AutoPosedComponent position={position}
                               mounted={open}
                               onMouseOver={onMouseOver}
                               onMouseLeave={onMouseLeave}
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