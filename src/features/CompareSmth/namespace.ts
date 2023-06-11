import {ICarNameWithId, IHandbookItem, IUserCommonData} from "shared";
import {CarProps, IServerCarProps} from "entities/Car/namespace";
import {
    IServerAdvertisement,
} from "entities/Advertisement/namespace";


export interface IServerCommonCompareItem {
    id: number
    type: CompareType

}
export interface IReduxState {
    modelsToCompareList: number[]
    addsToCompareList: number[]
    data: IServerCompareItem[]
    loading: boolean
}
export type CompareListItem = number
export type CompareType = 'ad' | 'model'

export interface IServerCompareItem<T extends object = IServerCompareModelCharacteristics | IServerCompareAdvertisementCharacteristics> {
    id: number
    car: ICarNameWithId
    photos: string[]
    type: CompareType
    average_price?: number
    rate?: number
    owner?: IUserCommonData
    price: null | undefined | number
    compare_item_id: number
    equipment?: {
        current: number
        equipments: { id: number, name: string }[]
    }
    characteristics: IServerCompareModelCharacteristics
}
export interface IServerCompareModelCharacteristics extends IServerCarProps {
    common: {
        mileage: number
        date_of_production: number
    } & IServerCarProps['common']
}

export interface IServerCompareAdvertisementCharacteristics {

}

export type ModelAdvertisementCompareItem = IServerCompareItem<IServerCompareModelCharacteristics>
export type AdvertisementCompareItem = IServerCompareItem<IServerCompareAdvertisementCharacteristics>



export type CompareOperation = 'dispersed_min' | 'dispersed_max' | 'points' | 'ranges'
export type FieldAccessor = (data: IHandbookItem) => string | number

export type CompareOperationFunction<T extends object[] = {}[]> = (key: string, data: object[], compareConfig?: T, accessor?: FieldAccessor) => number[]
export type ComparePointsConfig = ({
    value: (string | number)[] | (string | number),
    mark: number
})

export type CompareRangesConfig = ({
    min: number
    max: number
    mark: number
})
export type CompareConfig = Array<CompareRangesConfig | ComparePointsConfig>
export interface ICarCompareProp {
    key: CarProps | keyof IServerAdvertisement
    weight: number
    operation: CompareOperation | CompareOperationFunction
    compareConfig?: CompareConfig
    accessor?: FieldAccessor
}

