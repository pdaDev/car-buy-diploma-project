import {ICarName, ICarNameWithId, IHandbookItem, IOption, Paths} from "../types";
import {useTranslation} from "react-i18next";
import * as NS from "../../entities/Car/namespace";
import {F} from "@storybook/react-webpack5/dist/types-6a41b796";
import {RUB_SYMBOL} from "./constants";
import {useMultiLanguageHandbooks} from "./hoocs";
import {useAppNavigate} from "../../app/services";
import {getTimeAccordingNow, getYear} from "./timeHelpers";
import {IAdvertisementListItem} from "../../entities/Advertisement/namespace";

export const getPercents = (value: number | string) => `${value}%`

export const isObject = (el: any) => typeof el === 'object' && el !== null && !Array.isArray(el)

export const formatNumber = (num: number | string) => {
    let str = ''
    const stringNum = typeof num === 'number' ? num.toString() : num
    const stringNumber = stringNum.split('').reverse().join('')

    for (let i = 0; i < Math.ceil(stringNumber.length / 3); i++) {
        str = `${stringNumber.substring(i * 3, (i + 1) * 3).split('').reverse().join('')} ${str}`
    }
    return str.trim()
}

export const capitalize = (string: string | null | undefined) => {
    if (!string) {
        return  ''
    }
    return string[0].toUpperCase() + string.slice(1, string.length)
}


export const getFirstSymbolInUpperCase = (text: string | null | undefined) => (text && text.length >= 1) ? text[0].toUpperCase() : ''

export const  formatPrice = (num: number) => {
    return formatNumber(num).concat(' ').concat(RUB_SYMBOL)
}

export const formatPhoneNumber = (value: string, withRegion = true ) => {
    // if (value.length < 11) {
    //     return ''
    // }
    const startIndex = withRegion ? 1 : 0
    return `${withRegion ? `+${+value[0] - 1} ` : ''}(${value.slice(startIndex,startIndex + 3).padEnd(3, '_')}) ${value.slice(startIndex + 3, startIndex + 6).padEnd(3, '_')}-${value.slice(startIndex + 6 , startIndex + 10).padEnd(4, '_')}`
}


export const debounce = (func: Function, time: number) => {
    let timer: any
    return (e?: Event) => {
        clearTimeout(timer)
        timer = setTimeout(func, time, e)
    }

}

export function switchVariants(...args: any) {
    // @ts-ignore
    return [...arguments].filter(x => x)[0]
}

export const createHandbookOptions = (handbook: IHandbookItem[], getName: Function): IOption[] => {
    return handbook.map(item => ({
        label: getName(item),
        value: item.code
    }))
}

export function createOptions<T extends object>(items: T[] | null | undefined, valueKey: keyof T, labelKey: keyof T = 'name' as keyof T): IOption[] {
    return items ? items.map(item => ({
        label: item[labelKey] as string,
        value: item[valueKey] as string
    })) : []
}

export function createMultiLanguageOptions(codes: string[], translator: Function, rootIndex: string): IOption[] {
    return codes.map(code => ({
        label: translator(`${rootIndex}.${code}`) || '' as string,
        value: code
    }))
}

export const checkContainsString = (base: string, search: string) => new RegExp(search).test(base)

export const getTranslationIndex = (key: string, root: string) => `${root}.${key}`
export const getTranslationIndexCreator = (root: string) => (key: string) =>  getTranslationIndex(key, root)

export function getObjectFieldFromPath<T extends object>(object: T, path: Paths<T>) {
    // @ts-ignore
    return path.split('.').reduce((res, key) => res[key], object)
}

const isJustObject = (value: any) => typeof value === 'object' && value !== null && !Array.isArray(value);

const setField = (index: number, keys: string[], object: object | any, value: any): object => {
    const key = keys[index];
    const prev = isJustObject(object) ? object : {};
    const current = isJustObject(object[key]) ? object[key] : {};
    const payload = (isJustObject(value)) ? {...current, ...value} : value;
    return {
        ...prev,
        [key]: index === keys.length - 1
            ? payload
            : {
                ...setField(index + 1, keys, object[key as keyof typeof object], value),
            },
    };
};

export function setObjectFieldFromPath<T extends object>(object: T, path: Paths<T>, value: any) {
    return setField(0, path.split('.'), object, value)
}


export function getCarName({model, brend, generation}: ICarName) {
    return `${brend} ${model} (${generation})`
}

export function getCarNameFromObjectWithId({ model, brend, generation  }: ICarNameWithId) {
    return `${brend.name} ${model.name} (${generation.name})`
}
export function getCarNameFromModelWithId({ model: { name: modalName }, brend: { name: brendName }, generation: { name: genName } }: ICarNameWithId) {
    return `${brendName} ${modalName} (${genName})`
}

export function isHandbook (value: object | number | string | undefined | null) {
    return typeof value === 'object'
        && value !== null
        && ['ru_name', 'eng_name', 'ru_description', 'eng_description'].every(key => Object.keys(value).includes(key))
}

export function flatCarProps(props: object, t: Function) {
    const headers = Object.keys(props)
    const allProps = headers.reduce<object>((acc ,header,) =>  {
        acc = {
            ...acc,
            [header]: t(`car.props.categories.${header}`),
            // @ts-ignore
            ...props[header]
        }
        return acc
    }, {})
    const allPropsKeys = Object.keys(allProps)
    return {
        headers, allProps, allPropsKeys
    }
}

export function sortList<T>(array: T[], accessor: (arg: T) => any, isDescending: boolean) {
    const isString = typeof accessor(array[0]) === "string"
    return isString ? [...array].sort((a, b) => isDescending ? accessor(a).localeCompare(accessor(b)) : accessor(b).localeCompare(accessor(a)))
    : [...array].sort((a, b) => isDescending ? accessor(b) - accessor(a) : accessor(a) - accessor(b))
}

export function sortAccessor<T extends object>(sort: string | null, descendingKey: string) {
    return (obj: T) => {
        if (!sort) {
            return obj
        }
        const sortKey = sort.replace(descendingKey, '') as keyof T

        if (['date', 'time'].some(k => new RegExp(k).test(sortKey as string))) {
            return new Date(obj[sortKey] as string).valueOf()
        }

        return obj[sortKey]
    }
}
export function sorter<T extends object>(list: T[], sort: string | null, descendingKey: string) {
    return list
        ? sortList(list, sortAccessor(sort, descendingKey), sort ? new RegExp(descendingKey).test(sort) : false)
        : list
}



export const checkIsRussian = (i18n: { language: string }) => i18n.language === 'ru'
export type Register = {
    onChange: Function,
    name: string,
    onBlur: Function,
    ref: any
}




const transformObjectLevelToFormData = (obj: object, formData: FormData, root: string) => {
    Object.keys(obj).forEach(key => {
        const el = obj[key as keyof typeof obj] as any
        const formDataKey = root.length > 0 ? `${root}_${key}` : key
        if (typeof el === 'object' && el !== null) {
            formData = transformObjectLevelToFormData(el, formData, formDataKey)
        } else  if (Array.isArray(el)) {
            (el as any[]).forEach(x => formData.append(formDataKey, x.toString()))
        } else if (el !== null) {
            formData.append(formDataKey, el.toString())
        }
    })
    return formData
}

export const transformObjectToFormData = (obj: object): FormData => {
    let formData = new FormData()
    formData = transformObjectLevelToFormData(obj, formData, '')
    return formData
}

export function getObjectKeys<T extends object>(data: T) {
    return Object.keys(data) as (keyof T)[]
}

export const getCarQuery = (car: Partial<ICarNameWithId>) => {
    let query = 'car='
    query = car?.brend ? query.concat(`brend_id*${car.brend.id}`) : query
    query = car?.model ? query.concat(`%model_id*${car.model.id}`) : query
    query = car?.generation ? query.concat(`%generation_id*${car.generation.id}`) : query

    return query
}

export const parseStringNumber = (value: string | null) => {
    if (value !== null) {
        return +value.replace(' ', '')
    }
    return null
}