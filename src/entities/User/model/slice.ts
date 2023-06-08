import {createSlice, AnyAction, PayloadAction} from "@reduxjs/toolkit";
import * as NS from '../namespace'
import {getAnotherUserProfileData, getUserData, logout, patchUser} from "./thunks";
import {string} from "prop-types";


const emptyUserData = {
    username: null,
    isAdmin: false,
    isActive: false,
    id: null,
    isBanned: false,
    data: {
        phoneNumber: null,
        secondName: null,
        registerDate: null,
        firstName: null,
        avatar: null,
        email: null
    }
}
const initialState: NS.IReduxState = {
    isActivationMessagedWasSent: false,
    user: emptyUserData,
    loading: false,
    anotherUser: {
        ...emptyUserData,
        advertisements: []
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, { payload }: PayloadAction<NS.IServerUser>) => {
            state.user.username = payload.username
            state.user.data.firstName = payload.first_name
            state.user.data.secondName = payload.last_name
            state.user.data.phoneNumber = payload.phone_number
            state.user.data.email = payload.email
            state.user.data.avatar = payload.avatar
            state.user.isAdmin = Boolean(payload.is_superuser)
            state.user.id = payload.id
            state.user.isBanned = Boolean(payload.is_banned)
            state.user.data.registerDate = payload.date_joined
            state.user.isActive = Boolean(payload.active)

        },
        setUserPhoneNumber: (state, { payload }: PayloadAction<string>) => {
            state.user.data.phoneNumber = payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getUserData.fulfilled, (state, { payload }: PayloadAction<NS.IServerUser>) => {
                state.user.username = payload.username
                state.user.data.firstName = payload.first_name
                state.user.data.secondName = payload.last_name
                state.user.data.phoneNumber = payload.phone_number
                state.user.data.email = payload.email
                state.user.isAdmin = Boolean(payload.is_superuser)
                state.user.data.avatar = payload.avatar
                state.user.id = payload.id
                state.user.isBanned = Boolean(payload.is_banned)
                state.user.data.registerDate = payload.date_joined
                state.user.isActive = Boolean(payload.active)
            })
            .addCase(getAnotherUserProfileData.fulfilled, (state, { payload }: PayloadAction<NS.IServerAnotherUser>) => {
                console.log('render' + payload)
                state.anotherUser.data.firstName = payload.first_name
                state.anotherUser.data.secondName = payload.last_name
                state.anotherUser.data.email = payload.email
                state.anotherUser.data.avatar = payload.avatar
                state.anotherUser.id = payload.id
                state.anotherUser.data.registerDate = payload.date_joined
                state.anotherUser.advertisements = payload.advertisements || []
            })
            .addCase(logout.fulfilled, state => {
                state.loading = false
                state.user.isAdmin = false
                state.user.username = null
                state.user.data = initialState.user.data
                state.user.isBanned = false
                state.user.id = null
            })
            .addCase(patchUser.fulfilled, (state, { payload }: PayloadAction<NS.IServerUser>) => {
                state.user.username = payload.username
                state.user.data.firstName = payload.first_name
                state.user.data.secondName = payload.last_name
                state.user.data.avatar = payload.avatar
                state.user.data.phoneNumber = payload.phone_number
                state.user.data.email = payload.email
                state.user.isAdmin = Boolean(payload.is_superuser)
                state.user.isBanned = Boolean(payload.is_banned)
                state.user.id = payload.id
                state.user.data.registerDate = payload.date_joined
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