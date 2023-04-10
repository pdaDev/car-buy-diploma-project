
export type NotificationType = 'chat' | 'system' | 'inform'
export interface INotification {
    id: number
    date: Date
    type: NotificationType
    visible: boolean
    necessaryToStore: boolean
    data: NotificationData
    showingDuration?: number
}



export type NotificationData = IChatNotification | ISystemNotification | IInformNotification
export type CheckRightNotificationTypesDispersion<T extends  Record<NotificationType, NotificationData> > = T

export type NotificationDataTypes =  CheckRightNotificationTypesDispersion<{
    'chat': IChatNotification
    'system': ISystemNotification
    'inform': IInformNotification
}>

export type NotificationPayload<T extends NotificationType = 'system'> = {
    type: T
    data: NotificationDataTypes[T]
}

export type NotificationPayloadId = {
    id: number
}


export interface IReduxState {
    notifications: INotification[]
}


export interface IChatNotification {
    name: string
    avatar: string | null
    message: string
}

export interface ISystemNotification {
    type: 'error' | 'warning' | 'success'
    message: string
}

export interface IInformNotification {
    title: string
    image: string | null
    message: string
}

export interface NotificationComponentExtra {
    close?: Function
}
