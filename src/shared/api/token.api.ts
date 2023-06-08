import {api} from "./axiosConfig";

export const saveToken = (token: string) => localStorage.setItem('token', token)

export const getToken = () => localStorage.getItem('token')

export const refreshToken = async () => {
    try {
        const response = await api.post('api/token/refresh/', {refresh: getRefreshToken()} as any).then(data => data)
        if (response.status === 200) {
            saveToken(response.data.access)
            return response.data.access
        }
        return undefined

    } catch (e) {
        throw new Error()
    }
}
export const clearToken = () => localStorage.removeItem('token')

export const saveRefreshToken = (token: string) => localStorage.setItem('refresh_token', token)
export const clearRefreshToken = () => localStorage.removeItem('refresh_token')

export const getRefreshToken = () => localStorage.getItem('refresh_token')