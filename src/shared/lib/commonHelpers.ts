import {ICarName, IHandbookItem, IOption, Paths} from "../types";

export const getPercents = (value: number | string) => `${value}%`


export const formatNumber = (num: number) => {
    let str = ''
    const stringNumber = num.toString().split('').reverse().join('')

    for (let i = 0; i < Math.ceil(stringNumber.length / 3); i++) {
        str = `${stringNumber.substring(i * 3, (i + 1) * 3).split('').reverse().join('')} ${str}`
    }
    return str
}

export const capitalize = (string: string | null | undefined) => {
    if (!string) {
        return  ''
    }
    return string[0].toUpperCase() + string.slice(1, string.length)
}

export const  formatPrice = (num: number) => {

    return formatNumber(num).concat('₽')
}



export const debounce = (func: Function, time: number) => {
    let timer: any
    return (e: Event) => {
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

export function createOptions<T extends object>(items: T[], valueKey: keyof T, labelKey: keyof T = 'name' as keyof T): IOption[] {
    return items.map(item => ({
        label: item[labelKey] as string,
        value: item[valueKey] as string
    }))
}

export function createMultiLanguageOptions(codes: string[], translator: Function, rootIndex: string): IOption[] {
    return codes.map(code => ({
        label: translator(`${rootIndex}.${code}`) || '' as string,
        value: code
    }))
}

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
