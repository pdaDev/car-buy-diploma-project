import {createAsyncThunk} from "@reduxjs/toolkit";
import * as NS from "../namespace";
import {api, clearRefreshToken, clearToken, getToken, privateApi, saveRefreshToken, saveToken} from "shared";
import {addInformNotification, addSystemNotification} from 'entities/Notification'
import {closeModal} from "app/services/withPopupProvider";
import {initialize} from "app/services/withCommonData/model/slice";

export const register = createAsyncThunk(
    'register',
    async (payload: NS.IRegisterPayload, thunkAPI) => {
        try {
            const response = await api.post('api/auth/register/', payload).then(data => data)
            if (response.status === 200) {
                thunkAPI.dispatch(addSystemNotification({ type: 'success', message: 'Ваш аккаунт успешно создан' }))
                const { username, password } = response.data.data
                thunkAPI.dispatch(addInformNotification({ title: 'Необходима активация', image: null, message: 'На ваш адресс электронной почты было отправлено письмо с ссылкой для активации аккаунта' }))
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

            const response = await api.post('api/token/', payload).then(data => data)
            if (response.status < 300) {
                saveToken(response.data.access)
                saveRefreshToken(response.data.refresh)
                thunkAPI.dispatch(getUserData())
                thunkAPI.dispatch(closeModal({ key: 'auth' }))
            } else if (response.status === 401) {
                thunkAPI.dispatch(addSystemNotification({ type: "error", message: 'Не правильный логин или пароль' }))
            }
            else {
                throw new Error('e')
            }
        } catch (e) {
            thunkAPI.rejectWithValue(e)
        }
    }
)

export const loginViaVK = createAsyncThunk(
    'loginVK',
    async (_, thunkAPI) => {
        try {

            const response = await api.get('api/token/').then(data => data)
            if (response.status < 300) {
                saveToken(response.data.access)
                saveRefreshToken(response.data.refresh)
                thunkAPI.dispatch(getUserData())
                thunkAPI.dispatch(closeModal({ key: 'auth' }))
            } else if (response.status === 401) {
                thunkAPI.dispatch(addSystemNotification({ type: "error", message: 'Не правильный логин или пароль' }))
            }
            else {
                throw new Error('e')
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
                    thunkAPI.dispatch(initialize())
                    clearToken()
                    clearRefreshToken()
                }

            } catch (e) {
                thunkAPI.rejectWithValue(e)
            }
        } else {
            thunkAPI.dispatch(initialize())
        }
    }
)



export const patchUser = createAsyncThunk<NS.IServerUser,{data: FormData, onSuccess?: Function }>(
    'userPatch',
    async ({onSuccess, data }, thunkAPI) => {
        try {
            const response = await privateApi.patch('api/auth/me/', data, {
                headers:{ "Content-Type": "multipart/form-data" }
            })
            if (response.status < 300) {
                onSuccess && onSuccess()
                return response.data.data
            }
        } catch (e) {
           thunkAPI.rejectWithValue(e)
        }
    }
)

export const activateUser = createAsyncThunk(
    'acivateUser',
    async (_, thunkAPI) => {
        try {
            await privateApi.post('api/auth/activate')
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const getUserData = createAsyncThunk('user_data', async (_, thunkAPI) => {
    try {
        const response = await privateApi.get('api/auth/me/').then(data => data)
        thunkAPI.dispatch(initialize())
        if (response.status === 200) {
            setTimeout(() => thunkAPI.dispatch(initialize()), 10)
            return response.data.data
        }
    } catch (e) {
        thunkAPI.dispatch(initialize())
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
           return  thunkAPI.rejectWithValue(e)
        }
    }
)

export const resetPasswordConfirmation = createAsyncThunk(
    'resetPasswordConfirm',
    async (email, thunkAPI) => {
        try {
        } catch (e) {
            thunkAPI.rejectWithValue(e)
        }
    }
)


export const resetPassword = createAsyncThunk(
    'resetPasswordConfirm',
    async (data, thunkAPI) => {
        try {
            const response = await api.post(`api/auth/reset_password/`, data).then(data => data)
            return response
        } catch (e) {
            thunkAPI.rejectWithValue(e)
        }
    }
)
