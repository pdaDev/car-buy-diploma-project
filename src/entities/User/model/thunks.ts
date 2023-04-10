import {createAsyncThunk} from "@reduxjs/toolkit";
import * as NS from "../namespace";
import {api, clearRefreshToken, clearToken, getToken, privateApi, saveRefreshToken, saveToken} from "../../../shared";
import { addSystemNotification } from 'entities/Notification'
import {closeModal} from "../../../app/services/withPopupProvider";

export const register = createAsyncThunk(
    'register',
    async (payload: NS.IRegisterPayload, thunkAPI) => {
        try {
            const response = await api.post('api/auth/register/', payload).then(data => data)
            console.log(response)
            if (response.status === 200) {
                thunkAPI.dispatch(addSystemNotification({ type: 'success', message: 'Ваш аккаунт успешно создан' }))
                const { username, password } = response.data.data
                thunkAPI.dispatch(login({ username, password  }))
            } else if (response.status >= 500) {
                thunkAPI.rejectWithValue(new Error('500 timeout'))
            }
        } catch (e) {
            thunkAPI.rejectWithValue(e)
        }
    }
)

export const login = createAsyncThunk(
    'login',
    async (payload: NS.IAuthPayload, thunkAPI) => {
        try {
            console.log('f')
            const response = await api.post('api/token/', payload).then(data => data)
            if (response.status < 300) {
                saveToken(response.data.access)
                saveRefreshToken(response.data.refresh)
                thunkAPI.dispatch(getUserData())
                thunkAPI.dispatch(closeModal({ key: 'auth' }))
            } else {
                console.log('b')
                throw  new Error('e')
            }
        } catch (e) {
            thunkAPI.rejectWithValue(e)
        }
    }
)

export const logout = createAsyncThunk(
    'logout',
    async (_, thunkAPI) => {
        try {
            clearToken()
            clearRefreshToken()
            return {}

        } catch (e) {
            thunkAPI.rejectWithValue(e)
        }
    }
)

export const authme = createAsyncThunk(
    'authme',
    async (_, thunkAPI) => {
        if (getToken()) {
            try {
                const response = await privateApi.post('api/token/verify/', { token: getToken() }).then(data => data)
                if (response.status === 200) {
                    thunkAPI.dispatch(getUserData())
                } else  {
                    clearToken()
                    clearRefreshToken()
                }

            } catch (e) {
                thunkAPI.rejectWithValue(e)
            }
        }
    }
)

export const getUserData = createAsyncThunk('user_data', async (_, thunkAPI) => {
    try {
        const response = await privateApi.get('api/auth/me/').then(data => data)
        if (response.status === 200) {
            return response.data.data
        }
    } catch (e) {
        thunkAPI.rejectWithValue(e)
    }
})

export const getAnotherUserProfileData = createAsyncThunk(
    'profileUserData',
    async (id, thunkAPI) => {
        try {
            const response = await api.get(`user/${id}/`).then(data => data)
            if (response.status === 200) {
                return response.data
            }
        } catch (e) {
            thunkAPI.rejectWithValue(e)
        }
    }
)
