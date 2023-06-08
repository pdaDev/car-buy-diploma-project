import {IAdvertisementListItem} from "../Advertisement/namespace";

export interface IUserData {
    email: string | null
    phoneNumber: string | null
    firstName: string | null
    secondName: string | null
    avatar: string | null
    registerDate: string | null
}

export interface IServerUser {
    id: number
    last_login: string | null
    is_superuser: number
    first_name: string
    last_name: string
    is_staff: number
    active: number
    date_joined: string
    phone_number: string | null
    avatar: string | null
    is_banned: number
}
export interface IUser {
    username: string | null
    id: number | null
    data: IUserData
    isAdmin: boolean
    isActive: boolean
    isBanned: boolean
}

export interface IAnotherUser {
    username: string | null
    id: number | null
    data: IUserData
    advertisements: IAdvertisementListItem[]
}
export interface IReduxState {
    user: IUser
    isActivationMessagedWasSent: boolean,
    anotherUser: IAnotherUser
    loading: boolean
}

export interface IAuthPayload {
    username: string
    password: string
}

export interface IRegisterPayload extends IAuthPayload{
    email: string
    first_name: string
    last_name: string
}

export interface IServerUser {
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
    is_superuser: number
    phone_number: string | null
    date_joined: string
    active: number
    avatar: string | null
}

export interface IServerAnotherUser {
    id: number
    email: string
    first_name: string
    last_name: string
    phone_number: string
    date_joined: string
    avatar: string | null
    advertisements: IAdvertisementListItem[]
}