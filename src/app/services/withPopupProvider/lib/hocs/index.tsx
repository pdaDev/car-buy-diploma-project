import React, {ComponentType, FC, MouseEventHandler, useEffect, useRef} from "react";
import * as NS from '../../namespace'
import {useAppDispatch, useAppSelector} from "../../../withStore";
import {selectOpenedModals, selectOpenedModelsKeys} from "../../model/selectors";
import {closeModal} from "../../model";
import s from "../../ui/Modal.module.scss";
import {createPortal} from "react-dom";
import {usePopup} from "../../../../../shared";

const modalNode = document.getElementById('modal')
export const withPopup = (modalKey: NS.ModalsKeys) => (Component: ComponentType<NS.ModalProps>) => {
    const Container: FC = () => {
        const openedModals = useAppSelector(selectOpenedModals)
        const openedModalsKeys = useAppSelector(selectOpenedModelsKeys)
        const someModalIsOpen = openedModals.length > 0
        const index = openedModalsKeys.indexOf(modalKey)
        const d = useAppDispatch()
        const closeCurrentModal = () => d(closeModal({ key: modalKey }))
        const onKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeCurrentModal()
            }
        }

        useEffect( () => {
            if (someModalIsOpen) {
                document.getElementById('root')!.style.overflow = 'hidden'
            } else {
                document.getElementById('root')!.style.overflow = 'scroll'
            }
        }, [someModalIsOpen])

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
            <Component onClose={closeCurrentModal}
                       currentKey={modalKey}
                       { ...openedModals[index]?.payload }
            />
        </div>)
        const showModel = index !== -1
        usePopup(showModel)
        if (showModel) {
            return createPortal(modal, modalNode!)
        }

        return <></>
    }

    return Container
}

