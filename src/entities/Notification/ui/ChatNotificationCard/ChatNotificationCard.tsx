import {FC, MouseEventHandler} from "react";

import {closeSymbol, Label} from "shared";

import s from './ChatNotificationCard.module.scss'
import * as NS from '../../namespace'
import {NotificationCloseButton} from "../NotificationCloseButton/NotificationCloseButton";

interface IProps extends NS.IChatNotification {
    extra?: {
        goToChat?: Function
    } & NS.NotificationComponentExtra
}

export const ChatNotificationCard: FC<IProps> = ({
                                                     avatar,
                                                     message,
                                                     name,
                                                     extra
                                                 }) => {
    return <div className={s.chat_notification_wrapper}
                onClick={((extra && extra.goToChat) ? extra.goToChat : () => {}) as MouseEventHandler}>
        <div className={s.avatar}>
            {avatar && <img src={avatar} alt="avatar"/>}
        </div>
        <div className={s.content_container}>
            <Label label={name}/>
            <p>{message}</p>
        </div>
        { extra && extra.close && <NotificationCloseButton onClick={extra.close}/> }
    </div>
}