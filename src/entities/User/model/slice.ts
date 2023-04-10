import {createSlice, AnyAction, PayloadAction} from "@reduxjs/toolkit";
import * as NS from '../namespace'
import {getAnotherUserProfileData, getUserData, logout} from "./thunks";
import {string} from "prop-types";


const emptyUserData = {
    username: null,
    isAdmin: false,
    id: null,
    data: {
        phoneNumber: null,
        secondName: null,
        firstName: null,
        avatar: null,
        email: null
    }
}
const initialState: NS.IReduxState = {
    user: emptyUserData,
    loading: false,
    anotherUser: emptyUserData
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getUserData.fulfilled, (state, { payload }: PayloadAction<NS.IServerUser>) => {
                state.user.username = payload.username
                state.user.data.firstName = payload.first_name
                state.user.data.secondName = payload.last_name
                state.user.data.email = payload.email
                state.user.isAdmin = payload.is_superuser
                state.user.id = payload.id
            })
            .addCase(getAnotherUserProfileData.fulfilled, (state, { payload }: PayloadAction<NS.IServerUser>) => {
                console.log('render' + payload)
                state.anotherUser.username = payload.username
                state.anotherUser.data.firstName = payload.first_name
                state.anotherUser.data.secondName = payload.last_name
                state.anotherUser.data.email = payload.email
                state.anotherUser.isAdmin = payload.is_superuser
                state.anotherUser.id = payload.id
            })
            .addCase(logout.fulfilled, state => {
                state.loading = false
                state.user.isAdmin = false
                state.user.username = null
                state.user.data = initialState.user.data
                state.user.id = null
            })
            .addMatcher(isPending, state => {
            state.loading = true })
            .addMatcher(isError, state => {
                state.loading = false
            }).addMatcher(isFulfilled, state => {
                state.loading = false
        })
    }
})

function isPending(action: AnyAction) {
    return action.type.endsWith('pending')
}

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}
function isFulfilled(action: AnyAction) {
    return action.type.endsWith('fulfilled')
}

export const userReducer = userSlice.reducer
export const {  } = userSlice.actions