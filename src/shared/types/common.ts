import {IBrend, IHandbookItem} from "./model";
import {number} from "prop-types";

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

export type CommonServerListResult<T> = {
    results: T[],
    count: number
}

export type FormMode = 'view' | 'edit'

export type SearchData = {
    price: RangeFilter
    car: ICarSearch[]
}

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
    engine: {
        volume: RangeFilter
    } | null
    transmission_type: ContainsFilter
    car_drive_type: ContainsFilter
    car_body_type: ContainsFilter
} & SearchData

export type PaginationParams = {
    limit: number
    page: number
}

export interface IOption<T = string | number | null> {
    value: T
    label: string
}

type RangeFilter = {
    min: number | null
    max: number | null
}

type EqualFilter = string | number | null
type ContainsFilter = Array<number | string>


export type ElementSize = 'medium' | 'large' | 'small';
type Percent = `${number}%`
export type ElementWidth = 'full' | 'auto' | number | Percent
export type ElementColor = 'primary' | 'secondary'
export type SpaceLevel = 1 | 2 | 3 | 4 | 5 | 6
export type Color = 'primary' | 'secondary' | 'background' | 'grey-1' | 'grey-light' | 'fnt-primary' | 'red' | 'orange' | 'green'
export type FontWeight = 'bold' | 'medium' | 'regular' | 'semi-bold' | 'light'
export type Nullable<T extends object> = {
    [K in keyof T]:  T[K] | null
}
export type NullableAndUndefined<T extends object> = {
    [K in keyof T]:  T[K] | null | undefined
}
export type CardType = 'small' | 'large'
export type Position<T extends PosType> = {
    type: T
    defaultPos: PosAccordingPosType<T>
} | Pos
export type PosType = 'fixed' | 'auto-row' | 'auto-col' | 'auto'
type RowPos = 'left' | 'right'
type ColumnPos = 'up' | 'down'
export type Pos = RowPos & ColumnPos
type PosAccordingPosType<T extends PosType> = T extends ('fixed' | 'auto') ? Pos : T extends 'auto-row' ? RowPos : ColumnPos