import * as NS from '../namespace'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    showHeaderStatus: true,
    showFooterStatus: true,
    transparentHeader: false,
    transparentFooter: false,
    sideMenuContentType: null
} as NS.IReduxState

const commonLayoutSlice = createSlice({
    name: 'commonLayout',
    initialState,
    reducers: {
        hideHeader(state) {
            state.showHeaderStatus = false
        },
        showHeader(state) {
            state.showHeaderStatus = true
        },
        hideFooter(state) {
            state.showHeaderStatus = true
        },
        showFooter(state) {
            state.showFooterStatus = true
        },
        makeHeaderTransparent(state) {
            state.transparentHeader = true
        },
        makeHeaderNormal(state) {
            state.transparentHeader = false
        },
        makeFooterTransparent(state) {
            state.transparentFooter = true
        },
        makeFooterNormal(state) {
            state.transparentFooter = false
        },
        toggleSideMenuNotifications(state) {
            state.sideMenuContentType = state.sideMenuContentType === 'notifications' ? null : 'notifications'
        },
        toggleSideMenuChat(state) {
            state.sideMenuContentType = state.sideMenuContentType === 'chat' ? null : 'chat'
        }
    }
})

export const commonLayoutReducer = commonLayoutSlice.reducer
export const {
    showFooter,
    hideFooter,
    showHeader,
    hideHeader,
    makeFooterTransparent,
    toggleSideMenuChat,
    toggleSideMenuNotifications,
    makeHeaderNormal,
    makeFooterNormal,
    makeHeaderTransparent
} = commonLayoutSlice.actions