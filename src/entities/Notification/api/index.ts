import * as NS from '../namespace'
const LS_CODE = 'notifications'
export const getNotificationsLS = (): NS.INotification[] => {
    const notifications = localStorage.getItem(LS_CODE)
    return notifications ? JSON.parse(notifications) : []
}

export const resetNotificationsLS = () => {
    localStorage.removeItem(LS_CODE)
}

export const setNotificationsLS = (data: NS.INotification[]) => {
    localStorage.setItem(LS_CODE, JSON.stringify(data))
}

export const addNotificationLS = (notification: NS.INotification) => {
    console.log('i ad')
    const notifications = localStorage.getItem(LS_CODE)
    const parsedNotifications = notifications ? JSON.parse(notifications) as NS.INotification[] : []
    setNotificationsLS([...parsedNotifications, notification])
}

export const removeNotificationLS = (id: string) => {
    const notifications = localStorage.getItem(LS_CODE)
    const parsedNotifications = notifications ? JSON.parse(notifications) : []
    setNotificationsLS(parsedNotifications.filter((n: any) => n.id !== id))
}

export const getNotViewedNotificationsCount = (): number => {
    const notifications = localStorage.getItem(LS_CODE)
    const parsedNotifications = notifications ? JSON.parse(notifications) as NS.INotification[] : []
    return parsedNotifications.reduce<number>((acc, n) => !n.viewed ? acc + 1 : acc, 0)
}

export const viewNotificationLS = (id: string) => {
    const notifications = localStorage.getItem(LS_CODE)
    const parsedNotifications = notifications ? JSON.parse(notifications) as NS.INotification[] : []
    setNotificationsLS(parsedNotifications.map(n => n.id === id ? { ...n, viewed: true } : n))
}