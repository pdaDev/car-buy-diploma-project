import * as NS from '../namespace'
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/services";
import {
    addChatNotification, addInformNotification,
    addNotification, addSystemNotification,
    removeFromVisible,
    selectors
} from "../model";

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

export const useNotifyVisibleUpdate = () => {
    const d = useAppDispatch()
    const visibleNotifications = useAppSelector(selectors.getVisibleNotifications)

    useEffect(() => {
        if (visibleNotifications.length > 0) {
            const newNotification = visibleNotifications[visibleNotifications.length - 1]
            setTimeout(() => d(removeFromVisible(newNotification)), newNotification.showingDuration || 3000)
        }
    }, [visibleNotifications, d])
}