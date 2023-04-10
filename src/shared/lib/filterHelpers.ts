import {Paths} from "../types";
import {getObjectFieldFromPath, setObjectFieldFromPath} from "./commonHelpers";

export function setRangeFilterCreator<T extends  object>(data: T, onChange: (object: Partial<T>) => void) {
    return (key: Paths<T>) => (value: (number | string | null)[]) => {
        onChange(setObjectFieldFromPath(data, key, {
            min: value[0],
            max: value[1]
        }))
    }
}

export function setContainsFilterCreator<T extends object>(data: T, onChange: (object: Partial<T>) => void ) {
    return (key: Paths<T>) => (value: number | string | null) => {
        const array = (getObjectFieldFromPath(data, key) as Array<any>)
        const newArray = Array.isArray(value) ? value : array.includes(value) ? array.filter(v => v !== value) : [...array, value]
        onChange(setObjectFieldFromPath(data, key, array.includes(value) ? array.filter(v => v !== value) : newArray))
    }
}


export function setMaxFilterCreator<T extends object>(data: T, onChange: (object: Partial<T>) => void ) {
    return (key: Paths<T>) => (value: number | string | null) => {
        onChange(setObjectFieldFromPath(data, key, {
            max: value
        } ))
    }
}

export function setEqualFilter<T extends object>(data: T, onChange: (object: Partial<T>) => void ) {
    return (key: Paths<T>) => (value: number | string | null) => {
        onChange(setObjectFieldFromPath(data, key, value))
    }
}
export function setMinFilterCreator<T extends object>(data: T, onChange: (object: Partial<T>) => void  ) {
    return (key: Paths<T>) =>  (value: number | string | null) => {
        onChange(setObjectFieldFromPath(data, key, {
            min: value
        } ))
    }
}

export function filtersCreator<T extends object>(data: T, onChange: (object: Partial<T>) => void) {
    return {
        containsFilter: setContainsFilterCreator(data, onChange),
        equalFilter: setEqualFilter(data, onChange),
        rangeFilter: setRangeFilterCreator(data, onChange)
    }
}