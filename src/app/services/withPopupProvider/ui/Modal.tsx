import React, {FC, MouseEventHandler, ReactChildren, ReactNode, useEffect, useRef} from "react";

import * as NS from '../namespace'
import {useAppDispatch, useAppSelector} from "../../withStore";
import {selectOpenedModals} from "../model/selectors";
import s from './Modal.module.scss'
import { createPortal } from "react-dom";
import {closeModal} from "../model";

const modalNode = document.getElementById('modal')
interface IProps {
    children: ReactNode
    modalKey: NS.ModalsKeys
}

export const Modal: FC<IProps> = ({
    children,
    modalKey
                                  }) => {
    const openedModals = useAppSelector(selectOpenedModals)
    const index = openedModals.indexOf(modalKey)
    const d = useAppDispatch()
    const closeCurrentModal = () => d(closeModal({ key: modalKey }))
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeCurrentModal()
        }
    }

    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (ref.current) {
           setTimeout(() =>  ref.current!.focus(), 100)
        }
    }, [ref])
    const onModalClick: MouseEventHandler = (e) => {
        if (e.target === e.currentTarget) {
            closeCurrentModal()
        }
    }
    const modal = ( <div className={s.modal_wrapper}
                         tabIndex={0}
                         ref={ref}
                         onKeyDown={onKeyDown}
                         style={{zIndex: index + 100000}}
                         onClick={onModalClick}
    >
        { children }
    </div>)
    if (index !== -1) {
        return createPortal(modal, modalNode!)
    }

    return <></>
}