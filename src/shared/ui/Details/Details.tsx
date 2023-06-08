import {FC, MouseEventHandler, ReactNode, useEffect} from 'react'

import s from './Details.module.scss'
import styled from 'styled-components'
import {cn, useOpenStatus} from "../../lib";
import {Label} from "../Label/Label";

interface IProps {
    label?: string | null | undefined
    isOpen?: boolean,
    children: ReactNode
    labelElement?: ReactNode
}


export const Details: FC<IProps> = ({
    isOpen,
    label,
    children,
    labelElement
}) => {

    const [open, setOpen, toggle] = useOpenStatus()
    useEffect(() => {
        if (isOpen !== undefined)
            setOpen(isOpen)
    }, [isOpen])



    return <div className={cn(s.details, open && s.opened)}>
        <div className={s.card} onClick={toggle as MouseEventHandler}>
            { labelElement ||  <Label label={label} weight={'regular'} level={3} /> }
        </div>
        { open && <div className={s.container}>
            { children }
        </div> }
    </div>
}
