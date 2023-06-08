import {
    BaseSearchData, ICarBodyTypeHandbook,
    ICarName, ICarNameWithId, IColor,
    IHandbookItem, IRetrieveImage,
    IShortHandbookItem,
    IUserCommonData, Nullable,
    PaginationParams,
    ReviewPoints
} from "../../shared";
import {IReview} from "../Review/namespace";


export interface IPreSearchData {
    count: number
}

export interface IPrice {
    date: string
    price: number
}

type Address = {
    type: string
    name: string
    guid: string

}

export interface IAdvertisementAddress extends Address{
    parent: Address | null
}

export interface IAdvertisementListItem {
    advertisement_id: number
    date_of_production: string
    mileage: number
    name: ICarName
    owner: IUserCommonData
    car_body_type: IShortHandbookItem
    engine: IServerEngineCharacteristics
    transmission: IShortHandbookItem
    drive: IShortHandbookItem
    price: number
    photos: string[]
    start_date: string
    equipment_name: string
    address: null | Address
}

export interface IAdvertisementListItemWithStatus extends IAdvertisementListItem {
    status_code: IHandbookItem
}

export type StatusCode = 'O' | 'B' | 'F'

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
    status?: {
        code: StatusCode,
        name: string
    }
    address: string | null
}


export interface IServerEngineCharacteristics {

    fuel: IHandbookItem
    volume: number
    hp: number

}

export interface IServerCarCharacteristic {
    drive: IHandbookItem
    engine: IServerEngineCharacteristics,
    car_body_type: ICarBodyTypeHandbook
    transmission: IHandbookItem

}
export interface IServerAdvertisement {
    advertisement_id: number
    car_id: number
    date_of_production: number
    mileage: number
    in_taxi: number
    name: ICarNameWithId
    car_characteristics: IServerCarCharacteristic
    price: {
        prices: IPrice[],
        latest: number
    }
    photos: IRetrieveImage[]
    owner: {phone_number: string | null, email: string} & IUserCommonData
    start_date: string
    color: IColor
    description: string
    rate: number
    status_code: IHandbookItem
    review: IReview | null

}

export interface IAdvertisementPatchPayload {
    price?: number
    description?: string
    status?: string
    id: number
}
export interface IAdvertisementCreatePayload {
    price: number
    description: string
    date_of_production: string
    color: string
    car_id: number
    mileage: number
    owners_count: 0
    in_taxi: number
}

export interface IAdvertisementForm {
    price: string
    description: string
    date_of_production: number
    color: string
    mileage: string
    owners_count: 0
    in_taxi: boolean
}




export type GetAvertisemensPayload = {
    sort?: string | null;
    filters?: BaseSearchData | null
    limit: number
    page: number
    id?: number[]
} & PaginationParams


export type AdvertisementFormState = Nullable<Omit<IAdvertisementCreatePayload, 'in_taxi' | 'date_of_production' | 'mileage' | 'price'>>
    & { in_taxi: boolean, dateOfProduction: number | null, price: string | null, mileage: string | null }
