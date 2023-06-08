import {FC} from "react";

import s from './NotificationModule.module.scss'
import {useAppDispatch, useAppNavigate, useAppSelector} from "app/services";
import {
    ChatNotificationCard,
    selectors,
    SystemNotificationCard,
    NS,
    useNotifyVisibleUpdate, removeFromVisible, useNotificationInit
} from 'entities/Notification'
import {addPrefix, cn} from "shared";

interface IProps {
    position?: 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
}

export const NotificationModule: FC<IProps> = ({position = 'rightTop'}) => {

    const notifications = useAppSelector(selectors.getVisibleNotifications)
    useNotifyVisibleUpdate()
    const nav = useAppNavigate()
    const d = useAppDispatch()

    const closeNotification = (notification: NS.INotification) => {
        d(removeFromVisible(notification))
    }

    return <div className={cn(s.notifications_container, addPrefix('position', position, s))}>
        {
            notifications.map(n => {
                switch (n.type) {
                    case 'chat':
                        return <ChatNotificationCard {...n.data as NS.IChatNotification} id={n.id} viewed={n.viewed} extra={{
                            close: () => closeNotification(n), goToChat: (id: string) => nav(p => p.chat._key_(id)) }}/>
                    case 'system':
                        return <SystemNotificationCard {...n.data as NS.ISystemNotification} extra={{close: () => closeNotification(n)}}/>
                    default:
                        return null
                }
            }
        )
        }
    </div>
}