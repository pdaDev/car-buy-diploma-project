import {StateType} from "app/services";

export const getData = (state: StateType) => state.notification;

export const getAllNotifications = (state: StateType) => getData(state).notifications

export const getVisibleNotifications = (state: StateType) => getData(state).notifications.filter(n => n.visible)