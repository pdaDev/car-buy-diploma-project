import {StateType} from "../../index";

export const selectData = (state: StateType) => state.commonLayout
export const selectSideMenuNotificationsOpenStatus = (state: StateType) => selectData(state).sideMenuContentType === 'notifications'
export const selectSideMenuChatOpenStatus = (state: StateType) => selectData(state).sideMenuContentType === 'chat'
