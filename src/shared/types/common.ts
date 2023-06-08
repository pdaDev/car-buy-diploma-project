import {IBrend, IHandbookItem} from "./model";
import {number} from "prop-types";
import {Register} from "../lib";

type Nulll<T> = T | null;
type Empty<T> = T | null | undefined;
type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

export type Paths<T> = (T extends object ?
    { [K in Exclude<keyof T, symbol>]: T[K] extends Array<any>
        ? K
        : T[K] extends (Nulll<T> | Empty<T> | T)
            ? K
            : (`${K}${DotPrefix<Paths<T[K]>>}` | K)
    }[Exclude<keyof T, symbol>]
    : '') extends infer D ? Extract<D, string> : '';

export type SearchType = 'model' | 'advertisement';

export type CommonGetListPayload = {
    offset: number
    limit: number
    sort: string | null
}

export  type UserNicknameType = 'full' | 'only-first-name' | 'only-last-name' | 'with-short-first-name' | 'with-short-last-name'

export type CommonServerListResult<T> = {
    results: T[],
    count: number
}

export type FormMode = 'view' | 'edit' | 'create'

export type SearchData = {
    price: RangeFilter
}

export type SelectedCar = {
    model_id: number | null
    brend_id: number | null
    generation_id: number | null
}
export type CarWithEquipmentAndCarBodyType = {
    car_body_type_code: string | null
    equipment_id: number | null
} & SelectedCar
export interface ICarSearch {
    brend_id: number | null
    generation_id: number[]
    model_id: number[]
}

export type BaseSearchData = {
    carClass: ContainsFilter;
    tag:  ContainsFilter;
    advertisementType: ('new' | 'used')[]
} & SearchData

export type ExtendedSearchData = {
    advertisementType: ('new' | 'used')[]
    date_of_production: RangeFilter
    mileage: RangeFilter,
    engine: {
        volume: RangeFilter
        type: ContainsFilter
        fuel_type: ContainsFilter
        layout: ContainsFilter
        horse_powers: RangeFilter
        cyllinder_arrangement_type: ContainsFilter
        boost_type: ContainsFilter
    } | null
    transmission_type: ContainsFilter
    car_drive_type: ContainsFilter
    carClass: ContainsFilter;
    tag:  ContainsFilter;
    ecological_class: ContainsFilter
    car_body_type: ContainsFilter
    to_100_acceleration: RangeFilter
    fuel_consumption: RangeFilter
    fuel_tank: RangeFilter
    tank: RangeFilter
    width: RangeFilter
    height: RangeFilter
    clearance: RangeFilter
    countOfSitPlaces: RangeFilter
    wheelSize: RangeFilter
    suspensionType: ContainsFilter
    breakType: ContainsFilter
    color: ContainsFilter
    materials: ContainsFilter
    in_taxi: EqualFilter


} & SearchData

export type PaginationParams = {
    limit: number
    page: number
}

export interface IOption<T = string | number | null> {
    value: T
    label: string
}

export type RangeFilter = {
    min: number | null
    max: number | null
}

export type EqualFilter = string | number | null
export type ContainsFilter = Array<number | string>


export type ElementSize = 'medium' | 'large' | 'small';
type Percent = `${number}%`
export type ElementWidth = 'full' | 'auto' | number | Percent
export type ElementColor = 'primary' | 'secondary'
export type SpaceLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6
export type Color = 'light-card' | 'warning' | 'green-light' | 'primary' | 'secondary' | 'background' | 'grey-1' | 'grey-light' | 'fnt-primary' | 'red-light' | 'red' | 'fnt-black' | 'orange' | 'green' | 'primary-light'
export type FontWeight = 'bold' | 'medium' | 'regular' | 'semi-bold' | 'light'
export type Nullable<T extends object> = {
    [K in keyof T]:  T[K] | null
}
export type NullableAndUndefined<T extends object> = {
    [K in keyof T]:  T[K] | null | undefined
}
export type CardType = 'small' | 'large'
type RowPos = 'left' | 'right'
type ColumnPos = 'up' | 'down'
export type Pos = RowPos | ColumnPos
export type Position<T extends PosType> = {
    type: T
    defaultPos: PosAccordingPosType<T>
} | Pos


export type PosType = 'fixed' | 'auto-row' | 'auto-col' | 'auto'

type PosAccordingPosType<T extends PosType> = T extends ('fixed' | 'auto') ? Pos : T extends 'auto-row' ? RowPos : ColumnPos
export type CarPropType = 'title' | 'value'
export type RegisterFunction<T extends object> = (key: keyof T, object?: {  validate: Function  }) => Register

export type ChatLoadedImage = {
    url: string
    object: File
}

export interface IRetrieveImage {
    id: number
    photo: string
}

export type LoadedImage = { photo: string, id: null | number, file: null | File }
export type Validators<T extends object> = Partial<Record<keyof T, (v: string | null) => string | undefined>>

