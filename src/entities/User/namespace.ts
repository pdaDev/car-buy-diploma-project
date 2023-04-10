
export interface IUserData {
    username: string | null
    id: number | null
    data: {
        email: string | null
        phoneNumber: string | null
        firstName: string | null
        secondName: string | null
        avatar: string | null
    }
    isAdmin: boolean
}
export interface IReduxState {
    user: IUserData
    anotherUser: IUserData
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
    is_superuser: boolean
}