import React, {FC, MouseEventHandler, ReactNode, useEffect, useRef, useState} from 'react'

import s from './HeaderUserMenu.module.scss'
import {Button, cn, Label, useBlurFocus, useOpenStatus} from "../../../shared";
import {CSSTransition} from "react-transition-group";

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
                        <Button label={'личный кабинет'}
                                type={'secondary'}
                                onClick={goToPersonalCabinet}
                                width={140}
                        />
                        <Button type={'secondary'}
                                label={'Мои отзывы'}
                                onClick={goToReviews}
                                width={140}
                        />
                        <Button label={'Мои сообщения'}
                                type={'secondary'}
                                onClick={goToMessages}
                                width={140}
                        />
                        <Button label={'выйти'}
                                type={'primary'}
                                onClick={logout}
                                width={140}
                        />
                    </div>
                </div>
            </ CSSTransition>


        </>) : <Button label={'войти'} type={'primary'} onClick={login}/>}
    </div>
}


