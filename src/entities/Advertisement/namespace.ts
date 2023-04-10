import {
    BaseSearchData, ICarBodyTypeHandbook,
    ICarName,
    IHandbookItem,
    IShortHandbookItem,
    IUserCommonData,
    PaginationParams,
    ReviewPoints
} from "../../shared";



export interface IPrice {
    date: string
    price: number
}


export interface IAdvertisementListItem {
    advertisement_id: number
    date_of_production: string
    mileage: number
    name: ICarName
    owner: IUserCommonData
    car_body_type: IShortHandbookItem
    engine: {
        fuel: IShortHandbookItem
        volume: number
        hp: number
    }
    transmission: IShortHandbookItem
    drive: IShortHandbookItem
    price: number
    photos: string[]
    start_date: string
    equipment_name: string
}

export interface IAdvertisementCardData {
    engine: string
    name: string
    transmission: string
    carBodyType: string
    drive: string
    photos: string[]
    yearOfProduction: number
    mileage: string
    equipment: string
    startDate: string
    price: number
    owner: IUserCommonData
    advertisement_id: number
}


export interface IServerCarCharacteristic {
    drive: IHandbookItem
    engine: {
        fuel: IHandbookItem
        volume: number
        hp: number
    },
    car_body_type: ICarBodyTypeHandbook
    transmission: IHandbookItem

}
export interface IServerAdvertisement {
    advertisement_id: number
    date_of_production: string
    mileage: number
    in_taxi: number
    name: ICarName
    car_characteristics: IServerCarCharacteristic
    price: {
        prices: IPrice[],
        latest: number
    }
    photos: string[]
    owner: {phone_number: string | null, email: string} & IUserCommonData
    start_date: string
    color: string
    description: string
    rate: number
    review: ReviewPoints & {review_id: number} | null
}

export interface IAdvertisementPatchPayload {
    price?: number
    description?: string
    id: number
}

export type GetAvertisemensPayload = {
    sort?: string | null;
    filters?: BaseSearchData
    limit: number
    page: number
    ids?: number[]
} & PaginationParams