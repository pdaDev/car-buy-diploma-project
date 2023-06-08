import {BaseSearchData, ExtendedSearchData, ICarSearch} from "../types";
export const ADMIN_USER_ID = 1
export const BASE_URL = 'http://127.0.0.1:8000/'
export const closeSymbol = '×'
export const SPECIAL_SYMBOLS = '!@#$%^&*:?<>{}[];'
export const SAFE_METHODS = ['get', 'option']
export const ADVERTISEMENTS_CODE = ['O', 'B', 'F']
export const TINYINT_UNSIGNED = 255
export const INT_UNSIGNED = 4294967295.
export const SMALLINT_UNSIGNED = 65535
export const MEDIUMINT_UNSIGNED = 16777215
export const RUB_SYMBOL = '₽'
export const EMPTY_CAR_SEARCH_FILTER: ICarSearch = {
    brend_id: null,
    model_id: [],
    generation_id: [],
}

const EMPTY_MIN_MAX = {
    min: null,
    max: null
}

export const INIT_SEARCH_DATA = {
    tag: [],
    color: [],
    price: EMPTY_MIN_MAX,
    carClass: [],
    date_of_production: EMPTY_MIN_MAX,
    car_body_type: [],
    car_drive_type: [],
    mileage: EMPTY_MIN_MAX,
    engine: {
        volume: EMPTY_MIN_MAX,
        horse_powers: EMPTY_MIN_MAX,
        boost_type: [],
        type: [],
        layout: [],
        cyllinder_arrangement_type: [],
        fuel_type: [],
    },
    transmission_type: [],
    ecological_class: [],
    width: EMPTY_MIN_MAX,
    height: EMPTY_MIN_MAX,
    clearance: EMPTY_MIN_MAX,
    to_100_acceleration: EMPTY_MIN_MAX,
    breakType: [],
    countOfSitPlaces: EMPTY_MIN_MAX,
    fuel_consumption: EMPTY_MIN_MAX,
    fuel_tank: EMPTY_MIN_MAX,
    materials: [],
    suspensionType: [],
    wheelSize: EMPTY_MIN_MAX,
    in_taxi: 0,
    tank: EMPTY_MIN_MAX,
    advertisementType: [],
} as BaseSearchData & ExtendedSearchData
