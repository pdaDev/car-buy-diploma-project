import {SPECIAL_SYMBOLS} from "./constants";


const required = (message?: string) => (value: string) => (
    !value
        ? message || 'required'
        : ''
)
const maxLength = (max: number, message?: string) => (value: string) => (
    value.length <= max
        ? ''
        : message || 'max_length'
)

const minLength = (min: number, message?: string) => (value: string) => (
    value.length >= min
        ? ''
        : message || 'min_length'
)
const email = (message?: string) => (value: string) => (
    /[a-zA-Z\d]{3,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/.test(value)
        ? ''
        : message || 'email'
)

const hasDigit = (message?: string) => (value: string) => (
    /\d/.test(value)
        ? ''
        : message || 'has_digit'
)

const hasUpperLetter = (message?: string) => (value: string) => (
    /[A-ZА-Я]/.test(value)
        ? ''
        : message || 'letter_upper_case'
)

const hasLetters = (message?: string) => (value: string) => (
    /[a-zA-Zа-яА-Я]/.test(value)
        ? ''
        : message || 'has_letters'
)

const hasSpecialSymbols = (message?: string) => (value: string) => (
    new RegExp(`[${SPECIAL_SYMBOLS}]`).test(value)
        ? ''
        : message || 'has_special_symbols'
)

const onlyEnglish = (message?: string) => (value: string) => (
    /[а-яА-Я]/.test(value)
        ? message || 'only_english'
        : ''
)
const onlyRussian = (message?: string) => (value: string) => (
    /[a-zA-Z]/.test(value)
        ? message || 'only_russian'
        : ''
)

export const basicValidators = {
    required,
    maxLength,
    minLength,
    hasDigit,
    email,
    onlyEnglish,
    onlyRussian,
    hasLetters,
    hasUpperLetter,
    hasSpecialSymbols
} as const


export const combineValidators = (...validators: Function[]) => (value: string) => {
    const message = validators.reduce<string>((message, validator) => !message ? validator(value) : message, '')
    return message.length > 0 ? message : undefined
}
// @ts-ignore

