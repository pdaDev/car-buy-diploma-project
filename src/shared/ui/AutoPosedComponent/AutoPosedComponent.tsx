import {MouseEventHandler, ReactNode, useEffect, useLayoutEffect, useRef, useState} from 'react'
import s from './AutoPosedComponent.module.scss'
import {addPrefix, cn, debounce} from "../../lib";
import {Pos, Position, PosType} from "../../types";

interface IProps<T extends PosType> {
    children: ReactNode
    onClick?: MouseEventHandler
    onMouseOver?: MouseEventHandler,
    onMouseLeave?: MouseEventHandler
    position: Position<T>
    mounted: boolean
    Component: ReactNode | ((pos: Pos) => ReactNode)
}

export function AutoPosedComponent<T extends PosType>({children, position, mounted, Component, ...props}: IProps<T>) {
    const defaultPos = typeof position === 'string' ? position : position.defaultPos
    const posType = typeof position === 'string' ? 'fixed' : position.type
    const [currentPos, setCurrentPos] = useState<Pos>(defaultPos as Pos)
    const [open, setOpen] = useState(mounted)
    const isAuto = typeof position === 'object' && position !== null && position.type !== "fixed"

    const wrapper = useRef<HTMLDivElement>(null)
    type Sizes = ReturnType<typeof document.body.getBoundingClientRect>
    const getEndPoint = (pos: Pos, wrap: Sizes, tooltip: Sizes): number => {
        const toolTipOffset = 6
        switch (pos) {
            case 'down':
                return wrap.y + wrap.height + toolTipOffset + tooltip.height
            case 'left':
                return wrap.x - toolTipOffset - tooltip.width
            case 'right':
                return wrap.x + toolTipOffset + wrap.width + tooltip.width
            case 'up':
                return wrap.y - toolTipOffset - tooltip.height
            default:
                return 0
        }
    }

    const getNextElInArray = (el: string, array: string[]) => {
        const newIndex = array.indexOf(el) + 1
        return array[newIndex >= array.length ? 0 : newIndex]
    }

    const checkIsSmaller = (pos: Pos, endPoint: number): boolean => {
        const width = document.documentElement.clientWidth
        const height = document.documentElement.clientHeight
        switch (pos) {
            case 'down':
                return endPoint < height
            case 'right':
                return endPoint < width
            case 'up':
                return endPoint > 0
            case 'left':
                return endPoint > 0
            default:
                return false
        }
    }

    const definePos = () => {
        const wrap = wrapper.current
        const allPositions = ['left', 'up', 'right', 'down']
        const verticalPositions = ['up', 'down']
        const horizontalPositions = ['left', 'right']

        const avaialablePositions = posType === 'auto'
            ? allPositions
            : posType === 'auto-row'
                ? horizontalPositions
                : verticalPositions

        const wrapperSizes = wrap!.getBoundingClientRect()
        const tooltipSizes = wrap!.lastElementChild!.getBoundingClientRect()
        let posForAnalyze = defaultPos

        for (let i = 0; i < avaialablePositions.length; i++) {
            if (checkIsSmaller(posForAnalyze as Pos, getEndPoint(posForAnalyze as Pos, wrapperSizes, tooltipSizes))) {
                setCurrentPos(posForAnalyze as Pos)
                return
            } else {
                posForAnalyze = getNextElInArray(posForAnalyze, avaialablePositions) as Pos
            }
        }
        setCurrentPos(defaultPos as Pos)

    }

    useLayoutEffect(() => {
        if (isAuto) {
            if (mounted) {
                definePos()
                setTimeout(() => setOpen(true), 30)
            } else {
                setOpen(false)
            }
        }
    }, [mounted, wrapper.current])

    useEffect(() => {
        if (open && isAuto) {
            const debouncedResize = debounce(definePos, 50)
            document.addEventListener('resize', debouncedResize)
            return () => document.removeEventListener('resize', debouncedResize)
        }
    }, [open, isAuto])

    return <div className={s.wrapper}
                {...props}
                ref={wrapper}
    >
        {children}
        {mounted && <div
            className={cn(
                s.component,
                addPrefix('pos', currentPos, s),
                (isAuto ? open : mounted) && s.open)}
        >
            {
                // @ts-ignore
                typeof Component === 'function' ? Component(currentPos) : <Component/>
            }
        </div>}
    </div>

}