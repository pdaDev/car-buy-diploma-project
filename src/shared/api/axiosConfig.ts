import axios from "axios";
import {BASE_URL, SAFE_METHODS} from "../lib";
import {getToken, refreshToken} from "./token.api";
import type { AxiosRequestConfig, AxiosError } from 'axios'

import {BaseQueryFn} from "@reduxjs/toolkit/query";
import {parseError, StateType} from "../../app/services";
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
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
}))

privateApi.interceptors.response.use(response => response, async (error )=> {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._sent) {
        try {
            originalRequest._sent = true
            await refreshToken()
            return privateApi(originalRequest)
        } catch (e) {
            console.error(e)
        }
    }
    throw new Error(error)
})



type Privacy = 'not-authenticated' | 'authenticated' | 'all'

export const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: '' })
    : BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            body?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
            privacy?: Privacy
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

                const result = await getAxiosInstance(privacy, method)({ url: baseUrl + url, method, data, params })
                return { data: result.data }
            } catch (axiosError) {
                let err = axiosError as AxiosError
                const error = {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    }
                }
                store.dispatch(parseError(error))
                return error
            }
        }

