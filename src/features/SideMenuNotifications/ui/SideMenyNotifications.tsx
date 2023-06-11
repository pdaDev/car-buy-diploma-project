import {FC, useMemo} from "react";
import {useAppDispatch, useAppNavigate, useAppSelector} from "app/services";
import {
    ChatNotificationCard, clearNotifications,
    NS,
removeNotification, SystemNotificationCard,
} from "entities/Notification";
import {
    Button,
    Container,
    getTimeWithoutSeconds,
    getTranslationIndexCreator,
    Label,
    Stack
} from "shared";
import s from './SideMenuNotifications.module.scss'
import {useTranslation} from "react-i18next";
import {removeNotificationLS, resetNotificationsLS} from "entities/Notification/api";
import {INotification} from "entities/Notification/namespace";
import {getAllNotifications} from "entities/Notification/model/selectors";

export const SideMenuNotifications: FC = () => {
    const notifications = useAppSelector(getAllNotifications)
    const nav = useAppNavigate()
    const d = useAppDispatch()

    const closeNotification = (notification: NS.INotification) => {
        removeNotificationLS(notification.id)
        d(removeNotification(notification.id))
    }

    const clearAllNotifications = () => {
        d(clearNotifications())
        resetNotificationsLS()
    }

    const { t } = useTranslation()
    const getIndex = getTranslationIndexCreator('notifications')
    const groupedNotifications = useMemo(() => {
       return notifications.filter(n => n.necessaryToStore).reduce<Record<string, INotification[]>>((acc, n ) => {
           const todayDate = new Date()
           const today = todayDate.toLocaleDateString()
           todayDate.setDate(todayDate.getDay() - 1)
           const yesterday = todayDate.toLocaleDateString()
           let notificationDateLabel = new Date(n.date).toLocaleDateString() as string
           notificationDateLabel = notificationDateLabel === today ? t("chat.today") : notificationDateLabel
           notificationDateLabel = notificationDateLabel === yesterday ? t("chat.yesterday") : notificationDateLabel
           acc[notificationDateLabel] = acc[notificationDateLabel] || []
           acc[notificationDateLabel].push(n)
           return acc
       }, {})
    }, [notifications])


    const renderNotification = (n: INotification) => {
        switch (n.type) {
            case 'chat':
                return <ChatNotificationCard {...n.data as NS.IChatNotification}
                                             id={n.id} viewed={n.viewed}
                                             extra={{
                                                 close: () => closeNotification(n), goToChat: (id: string) => nav(p => p.chat._key_(id)) }}/>
            case 'system':
                return <SystemNotificationCard {...n.data as NS.ISystemNotification} extra={{close: () => closeNotification(n)}}/>
            default:
                return null
        }
    }
    const renderNotifications = (notifications: INotification[]) => {
        return notifications.map((n: any) => (
                <Stack spacing={1}>
                    <Label label={getTimeWithoutSeconds(new Date(n.date))}
                           level={5}
                           weight={'regular'}
                           type={'secondary'}/>
                    <Stack direction={'row'} size={'width'} spacing={4} vAlign={'center'}>
                        { !n.viewed && <span className={s.mark}>
                        !
                    </span> }
                        { renderNotification(n) }
                    </Stack>
                </Stack>
            )
        )
    }
    return <Container p={4}>
        <Stack size={'container'} spacing={4}>
                <Label label={t(getIndex('label'))}
                       weight={'medium'}
                       level={3} size={5}
                />
                <div className={s.notifications}>
                    { Object.keys(groupedNotifications).map(key => {
                        return <>
                            <Stack size={'width'} hAlign={'center'}>
                                <Label label={key} level={4} />
                            </Stack>
                            { /* @ts-ignore */ }
                            { renderNotifications(groupedNotifications[key as keyof typeof groupedNotifications]) }
                        </>
                    }) }
                </div>
            <div className={s.b} >
                <Button type={'primary'}
                        label={t(getIndex('reset')) as string}
                        onClick={clearAllNotifications}
                        width={'full'}
                />
            </div>
        </Stack>

    </Container>
}