import {BaseSearchData, ExtendedSearchData, ICarSearch} from "../types";

export const BASE_URL = 'http://127.0.0.1:8000/'
export const closeSymbol = '×'
export const SPECIAL_SYMBOLS = '!@#$%^&*:?<>{}[];'
export const SAFE_METHODS = ['get', 'option']
export const EMPTY_CAR_SEARCH_FILTER: ICarSearch = {
    brend_id: null,
    model_id: [],
    generation_id: [],
}

export const INIT_SEARCH_DATA = {
    tag: [],
    price: {
        min: null,
        max: null
    },
    carClass: [],
    date_of_production: {
        min: null,
        max: null
    },
    car_body_type: [],
    car_drive_type: [],
    engine: {
        volume: {
            min: null,
            max: null
        },
    },
    transmission_type: [],

    advertisementType: [],
    car: [{brend_id: null, model_id: [], generation_id: [] } as ICarSearch]
} as BaseSearchData & ExtendedSearchData