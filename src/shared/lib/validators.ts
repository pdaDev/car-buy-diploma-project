import {SPECIAL_SYMBOLS} from "./constants";
import {parseStringNumber} from "./commonHelpers";

type Value = string | null
const required = (message?: string) => (value: Value) => {
    if (!value) {
        return message || 'required'
    }
}

const maxValue = (max: number, message?: string) => (value: string | null) => {
    if (value && parseStringNumber(value)! > max) {
        return message || 'max_value=' + max
    }
}

const minValue = (min: number, message?: string) => (value: string | null) => {
    if (value && parseStringNumber(value)! < min) {
        return message || 'min_value=' + min
    }
}

const maxLength = (max: number, message?: string) => (value: string | null) => {
    if (value && value.length > max) {
        return message || 'max_length=' + max
    }
}

const minLength = (min: number, message?: string) => (value: string | null) => {
    if (value && value.length < min) {
        return message || 'min_length='+ min
    }
}
const email = (message?: string) => (value: string | null) => {
    if (value && !/[a-zA-Z\d]{3,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/.test(value)) {
        return message || 'email'
    }
}

const hasDigit = (message?: string) => (value: string | null) => {
    if (value && !/\d/.test(value)) {
        return message || 'has_digit'
    }
}

const hasUpperLetter = (message?: string) => (value: string | null) => {
    if (value && !/[A-ZА-Я]/.test(value)) {
        return message || 'letter_upper_case'
    }
}

const hasLetters = (message?: string) => (value: string | null) => {
    if (value && !/[a-zA-Zа-яА-Я]/.test(value)) {
        return message || 'has_letters'
    }
}

const hasSpecialSymbols = (message?: string) => (value: string | null) => {
    if (value && !new RegExp(`[${SPECIAL_SYMBOLS}]`).test(value)) {
        return message || 'has_special_symbols'
    }
}

const onlyEnglish = (message?: string) => (value: string | null) => {
    if (value && /[а-яА-Я]/.test(value)) {
        return message || 'only_english'
    }
}
const onlyRussian = (message?: string) => (value: string | null) => {
    if (value && /[a-zA-Z]/.test(value)) {
        return message || 'only_russian'
    }
}

const onlyLetters = (message?: string) => (value: string | null) => {
    if (value && /[^a-zа-яА-ЯA-Z]/.test(value)) {
        return message || 'only_letters'
    }
}

const onlyDigits = (message?: string) => (value: string | null) => {
    if (value && /\D\s/.test(value)) {
        return message || 'only_digits'
    }
}

const isHEX = (message?: string) => (value: string | null) => {
    if (value && !/#\w{6}/.test(value)) {
        return message || 'is_hex'
    }
}

export const basicValidators = {
    onlyDigits,
    onlyLetters,
    isHEX,
    required,
    maxLength,
    minLength,
    hasDigit,
    email,
    onlyEnglish,
    maxValue,
    minValue,
    onlyRussian,
    hasLetters,
    hasUpperLetter,
    hasSpecialSymbols
} as const


export const combineValidators = (...validators: Function[]) => (value: string | null | number) => {
    const message = validators.reduce<string>((message, validator) => !message ? validator(value) : message, '')
    if (message) {
        return message
    }
}
// @ts-ignore

