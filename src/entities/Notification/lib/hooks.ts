import * as NS from '../namespace'
import {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "app/services";
import {
    addChatNotification, addInformNotification,
    addNotification, addSystemNotification,
    removeFromVisible,
    selectors, setNotifications, viewNotification
} from "../model";
import {addNotificationLS, getNotificationsLS, viewNotificationLS} from "../api";

interface IUseNotifyReturnType {
    notify: (notification: NS.NotificationPayload) => void
    chatNotify: (notification: NS.IChatNotification) => void
    systemNotify: (notification: NS.ISystemNotification) => void
    informNotify: (notification: NS.IInformNotification) => void
}
export function useNotify(notification?: NS.NotificationPayload, whenShow?: boolean): IUseNotifyReturnType {
    const d = useAppDispatch()
    const notify = (notification: NS.NotificationPayload) => d(addNotification(notification))

    const chatNotify = (notification: NS.IChatNotification) =>d(addChatNotification(notification))
    const systemNotify = (notification: NS.ISystemNotification) => d(addSystemNotification(notification))
    const informNotify = (notification: NS.IInformNotification) => d(addInformNotification(notification))

    useEffect(() => {
        if ((whenShow === true || whenShow === undefined) && notification) {
            notify(notification)
        }
    }, [whenShow, notify, notification])

    return { notify, chatNotify, systemNotify, informNotify }
}


export const useNotificationInit = () => {
    const d = useAppDispatch()

    useEffect(() => {
        const notifications = getNotificationsLS()
        d(setNotifications(notifications))
    }, [])
}
export const useNotifyVisibleUpdate = () => {
    const d = useAppDispatch()
    const visibleNotifications = useAppSelector(selectors.getVisibleNotifications)
    const [visibleNotificationsHistory, setHistory] = useState<string[]>([])

    useEffect(() => {
        if (visibleNotifications.length > 0) {
            const newNotification = visibleNotifications.find(n => !visibleNotificationsHistory.includes(n.id))
            if (newNotification) {
                if (newNotification.necessaryToStore) {
                    addNotificationLS( {...newNotification, visible: false})
                }
                setTimeout(() => d(removeFromVisible(newNotification)), newNotification.showingDuration || 3000)
            }
        }
        setHistory(visibleNotifications.map(n => n.id))
    }, [visibleNotifications, d])
}

export const useNotificationView = (notificationId: string, viewedStatus: boolean) => {
    const ref = useRef<HTMLImageElement>(null)
    const d = useAppDispatch()
    useEffect(() => {
        if (ref.current && !viewedStatus && !document.hidden) {
            const observer = new IntersectionObserver(() => {
                setTimeout(() => {
                    d(viewNotification(notificationId))
                    viewNotificationLS(notificationId)
                }, 3000)

            }, {
                root: null,
                rootMargin: "0px",
                threshold: 1.0, })

            observer.observe(ref.current)

            return () => {
                observer.disconnect()
            }
        }
    }, [ref, notificationId, viewedStatus])
    return ref
}