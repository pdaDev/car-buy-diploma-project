import {ReactNode} from "react";
import {ICarBodyTypeHandbook, ICarNameWithId, IOption} from "../../shared";
import {IServerAdvertisement} from "../../entities/Advertisement/namespace";
import {CarProps} from "../../entities/Car/namespace";
import {number} from "prop-types";
import {Timestamp} from "firebase/firestore";




export type SingleValue = string | null | number
export type MultipleValue = SingleValue[]

export type TestData = {
    money: SingleValue
    isFirstAuto: SingleValue
    areasOfUse: MultipleValue
    brends: MultipleValue
    desires: MultipleValue
    carBodyTypes: MultipleValue
    goals: MultipleValue
    engine: SingleValue
    climat: SingleValue
}

export type MinMax = {
    min: number, max: number
}

export type TestPayload = Partial<Record<MinMaxCriteria, MinMax> & { desire: Desire[] } & Record<SingleValueCriteria, number | string> & Record<MultipleValueCriteria, string[] | number[]>>
export type Step = {
    weight: number
    code: keyof TestData
    type: 'handbooks' | 'self'
    extra?: boolean
    elements: {
        weight?: number
        code: string
        image?: string | null
        recommendations: TestPayload
        ru_name?: string
        eng_name?: string
    }[],
    renderEl?: (content: string, image: string | null | undefined, extraName: string | undefined) => ReactNode

}

export type CriteriaType = 'single' | 'mutliple' | 'min_max'
export type Keys = CarProps
export type CriteriaList = Readonly<Keys[]>


export const All_CRITERIA = [
    'engine', 'car_body_type', 'sit_place', "trank_volume", "to_100", "clearance", "drive", "fuel_consumption",
        "brend", 'desire'] as const
export const MIN_MAX_CRITERIA = ['price', 'fuel_consumption', 'to_100', 'clearance', 'sit_place', 'trank_volume'] as const
export const MULTIPLE_VALUES_CRITERIA = ['car_body_type', 'brend', 'drive', 'desire'] as const

export const DESIRES = ["comfort_point", "reliable_point", "contrallabilty_point",
    "safety_point", "economic_point", "cross_country_point"] as const
export type Desire = typeof DESIRES[number]
export const SINGLE_VALUE_CRITERIA  = ['engine'] as const

export type AllCriteria = typeof All_CRITERIA[number]
export type MinMaxCriteria = typeof MIN_MAX_CRITERIA[number]
export type SingleValueCriteria = typeof SINGLE_VALUE_CRITERIA[number]
export type MultipleValueCriteria = typeof MULTIPLE_VALUES_CRITERIA[number]


export type IServerTestCar = {
    price: {
        min: number,
        max: number
    },
    equipment: string
    car_body_type: ICarBodyTypeHandbook
    car_id: number
    photos: string[]
    match_status: 0 | 1 | 2
    name: ICarNameWithId

}

export interface ISavedTestResult {
    id: number
    date: number
    results: TestPayload
}

export interface IDBUserSavedTestResults {
    userId: number
    savings: ISavedTestResult
}

export interface ISavedResultsReduxState {
    savedResultsId: number[]
}