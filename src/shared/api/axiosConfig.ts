import axios from "axios";
import {BASE_URL, SAFE_METHODS} from "../lib";
import {getToken, refreshToken} from "./token.api";
import type { AxiosRequestConfig, AxiosError } from 'axios'
import {BaseQueryFn} from "@reduxjs/toolkit/query";
import {parseError, setFatalError, StateType} from "../../../../car-buy/src/app/services";
import {addSystemNotification} from "../../../../car-buy/src/entities/Notification";




export const api = axios.create({
    baseURL: BASE_URL,
    validateStatus: (status: number) => {
        return status >= 200 && status <= 500
    }
})

export const privateApi = axios.create({
    baseURL: BASE_URL
})

privateApi.interceptors.request.use((config => {
    if (!(config as any)._sent) {
        config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
}))

privateApi.interceptors.response.use(response => response, async (error )=> {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._sent) {
        try {
            originalRequest._sent = true
            const newToken = await refreshToken()
            console.log(originalRequest.data)
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`

            if (/"token":"/.test(originalRequest.data)) {
                originalRequest.data = `{"token": "${newToken}"}`
            }
            return privateApi(originalRequest)
        } catch (e) {
            console.error(e)
        }
    }
    throw new Error(error)
})

//CreateAxiosDefaults['headers']
type Headers = any

const h: Headers = {
    "Content-Type": 'multipart/form-data'
}


type Privacy = 'not-authenticated' | 'authenticated' | 'all'
type Method = 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT'

export const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: '' })
    : BaseQueryFn<
        {
            url: string
            method: Method
            body?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
            privacy?: Privacy
            headers?:  any
        } | string,
        unknown,
        unknown
    >  =>
        async (args, store, extraOptions) => {
            try {

                const getAxiosInstance = (privacy: Privacy, method: string) => {
                    if (privacy) {
                        switch (privacy) {
                            case 'all':
                                return (store.getState() as StateType).user.user.id !== null ? privateApi : api
                            case 'not-authenticated':
                                return api
                            case 'authenticated':
                                return privateApi
                        }
                    } else if (SAFE_METHODS.includes(method || 'get')) {
                        return api
                    } else {
                        return privateApi
                    }
                }

                const isString = typeof args === 'string'
                const method = isString ? 'get' : args.method || 'get'
                const privacy = isString ? 'all' : args!.privacy || 'all'
                const data = isString ? {} : args.body
                const params =  isString ? {} : args.params
                const url = isString ? args : args.url
                const headers = isString ? {} : args.headers

                const result = await getAxiosInstance(privacy, method)({ url: baseUrl + url, method, data, params, headers })
                return { data: result.data }
            } catch (axiosError) {
                let err = ((axiosError as any).message as string).split(' ')

                const status = +err[err.length - 1]

                const isString = typeof args === 'string'
                const method = isString ? 'get' : args.method || 'get'
                const error = {
                    error: {
                        status: status,
                        data: 'Server Error'
                    }
                }
                store.dispatch(parseError(error))
                if (status >= 500) {
                    store.dispatch(setFatalError({...error.error as any}))
                }

                if (!SAFE_METHODS.includes(method) && status >= 400 && status < 500) {
                    store.dispatch(addSystemNotification({ message: 'Ошибка, попробуйте снова', type: 'error' }))
                }


                return error
            }
        }

