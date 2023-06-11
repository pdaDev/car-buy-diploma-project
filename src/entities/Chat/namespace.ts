import {ICarNameWithId, IUserCommonData} from "shared";

export type ChatType = 'sell' | 'support' | 'admin'
export type LastMessage = Pick<IMessage, 'text' | 'date' | 'senderId'>
export interface IChatCardData {
    id: string
    car: ICarNameWithId
    user: IUserCommonData
    carId: number
    userId: number
    type: ChatType
    lastMessage: LastMessage
    receiverId: number
    initiatorId: number
}

export interface IMessage {
    id: string
    text: string
    senderId: number
    date: any
    isEdited: boolean
    images: string[]
    replied: null | string
    viewed: boolean
}



export interface IGetChatsData {
    users: number[]
    cars: number[]
}

export interface IServerChat {
    id: string
    advertisementId: number
    carId: number
    initiatorId: number
    type: 'sell' | 'support'
    receiverId: number
    messages: IMessage[]
}

export type ChatDataUsers = IUserCommonData
export type ChatDataCars = ICarNameWithId
export type IChatData ={
    cars: ChatDataCars[],
    users: ChatDataUsers[],
}


export interface IReduxState extends IChatData {
    usersId: Array<number>
    carsId: number[]
    modalCurrentChat: string | null
    currentChat: string | null
    loading: boolean
    chats: IReduxChat[]
}

export interface IReduxChat {
    id: string
    advertisementId: number
    receiverId: number
    carId: number
    initiatorId: number
    userId: number
    type: 'sell' | 'support'
    lastMessage: Pick<IMessage, 'text' | 'date' | 'senderId'>
}

