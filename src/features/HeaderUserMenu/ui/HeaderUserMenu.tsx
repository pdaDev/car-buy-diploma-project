import React, {FC, MouseEventHandler, ReactNode, useEffect, useRef, useState} from 'react'

import s from './HeaderUserMenu.module.scss'
import {
    Button,
    cn,
    getTranslationIndexCreator,
    Label,
    useBlurFocus,
    useOpenStatus
} from "shared";
import {CSSTransition} from "react-transition-group";
import {useTranslation} from "react-i18next";

export interface IProps {
    isAuthed: boolean
    avatar: string | null
    name: string
    logout: MouseEventHandler
    login: MouseEventHandler
    goToPersonalCabinet: MouseEventHandler
    goToReviews: Function
    goToMessages: Function
    goToTestResults: Function

}

export const HeaderUserMenu: FC<IProps> = ({
                                               isAuthed,
                                               name,
                                               avatar,
                                               logout,
                                               login,
                                               goToPersonalCabinet,
                                               goToReviews,
                                               goToTestResults,
                                               goToMessages
                                           }) => {
    const [isOpen, setOpenStatus, toggleOpenStatus] = useOpenStatus()
    const {onFocus, onBlur} = useBlurFocus(() => setOpenStatus(false))
    const ref = useRef(null)
    const { t } = useTranslation()
    const getIndex = getTranslationIndexCreator("header_menu")
    return <div className={s.wrapper}
                tabIndex={0}
                onFocus={onFocus}
                onBlur={onBlur}
    >
        {isAuthed ? (<>
            <div className={cn(s.avatar_wrapper)}
                 onClick={toggleOpenStatus as MouseEventHandler}>
                <div className={s.avatar}>
                    {avatar && <img src={avatar} alt="avatar"/>}
                </div>
            </div>

            <CSSTransition timeout={300} unmountOnExit classNames={{
                enter: s['enter'],
                enterActive: s['enter_active'],
                enterDone: s['enter_active'],
                exit: s['enter_active'],
                exitActive: s['exit_active'],
            }} in={isOpen}>
                <div className={cn(s.modal)} ref={ref}>
                    <div className={s.content}>
                        <div className={s.name_wrapper}>
                            <Label level={4} weight={'medium'} label={name}/>
                        </div>
                        <Button label={t(getIndex("personal_cabinet")) as string}
                                type={'secondary'}
                                onClick={goToPersonalCabinet}
                                width={140}
                        />
                        <Button type={'secondary'}
                                label={t(getIndex("reviews")) as string}
                                onClick={goToReviews}
                                width={140}
                        />
                        <Button label={t(getIndex("chats")) as string}
                                type={'secondary'}
                                onClick={goToMessages}
                                width={140}
                        />
                        <Button label={t(getIndex("logout")) as string}
                                type={'primary'}
                                onClick={logout}
                                width={140}
                        />
                    </div>
                </div>
            </ CSSTransition>


        </>) : <Button label={t(getIndex("login")) as string} type={'primary'} onClick={login}/>}
    </div>
}


