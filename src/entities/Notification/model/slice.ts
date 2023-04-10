import * as NS from '../namespace'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {func} from "prop-types";

const initialState = {
    notifications: []
} as NS.IReduxState;


function addNotificationHandler<T extends NS.NotificationType>(state: NS.IReduxState, payload: {type: T} & NS.NotificationPayload<T>, visible: boolean) {
    state.notifications = [...state.notifications, {
        ...payload,
        id: state.notifications.length,
        date: new Date(),
        visible: visible,
        necessaryToStore: payload.type !== 'system',
        showingDuration: 3000
    }]
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addSystemNotification(state, { payload }: PayloadAction<NS.ISystemNotification>) {
            addNotificationHandler(state, { type: "system", data: payload}, true)
        },
        addChatNotification(state, { payload }: PayloadAction<NS.IChatNotification>) {
            addNotificationHandler(state, { type: "chat", data: payload}, true)
        },
        addInformNotification(state, { payload }: PayloadAction<NS.IInformNotification>) {
            addNotificationHandler(state, { type: "inform", data: payload}, true)
        },
        addNotification(state, { payload }: PayloadAction<NS.NotificationPayload<NS.NotificationType>>) {
           addNotificationHandler(state, payload, true)
        },
        addNotificationToStore(state, { payload }: PayloadAction<NS.NotificationPayload<NS.NotificationType>>) {
            addNotificationHandler(state, payload, false)
        },
        showNotificationFromStore(state, { payload }: PayloadAction<NS.NotificationPayloadId>) {
            state.notifications = state.notifications.map(n => n.id === payload.id ? {...n, visible: true} : n)
        },
        removeFromVisible(state, { payload}: PayloadAction<NS.INotification>) {
            if (payload.necessaryToStore) {
                state.notifications = state.notifications.map(n => n.id === payload.id ? {...n, visible: false} : n)
            } else {
                state.notifications = state.notifications.filter(n => n.id !== payload.id)
            }
        },
        removeNotification(state, { payload }: PayloadAction<NS.NotificationPayloadId>) {
            state.notifications = state.notifications.filter(n => n.id !== payload.id)
        },
        clearNotifications(state) {
            state.notifications = []
        },
        hideAllVisible(state) {
            state.notifications = state.notifications.map(n => ({ ...n, visible: false }))
        }
    }
})
export const notificationReducer = notificationSlice.reducer

export const { addNotification, clearNotifications, removeFromVisible, addChatNotification, addInformNotification, addSystemNotification } = notificationSlice.actions

