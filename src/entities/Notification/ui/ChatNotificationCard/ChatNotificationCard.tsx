import {FC, MouseEventHandler} from "react";

import {closeSymbol, Label} from "shared";

import s from './ChatNotificationCard.module.scss'
import * as NS from '../../namespace'
import {NotificationCloseButton} from "../NotificationCloseButton/NotificationCloseButton";
import {useNotificationView} from "../../lib/hooks";

interface IProps extends NS.IChatNotification {
    id: string
    viewed: boolean
    extra?: {
        goToChat?: Function
    } & NS.NotificationComponentExtra
}

export const ChatNotificationCard: FC<IProps> = ({
                                                     chatId,
                                                     avatar,
                                                     message,
                                                     name,
                                                     viewed,
                                                     id,
                                                     extra
                                                 }) => {

    const closeNotification: MouseEventHandler = e => {
        e.stopPropagation()
        extra?.close && extra.close()
    }
    const ref = useNotificationView(id, viewed)
    return <div className={s.chat_notification_wrapper}
                ref={ref}
                onClick={() => extra?.goToChat && extra.goToChat(chatId)}>
        <div className={s.avatar}>
            {avatar && <img src={avatar} alt="avatar"/>}
        </div>
        <div className={s.content_container}>
            <Label label={name} level={4} weight={'regular'}/>
            <p>{message}</p>
        </div>
        {extra && extra.close && <NotificationCloseButton onClick={closeNotification}/>}
    </div>
}