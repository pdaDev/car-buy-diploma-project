import {FocusEventHandler, useEffect, useRef, useState} from "react";
import {FormMode, IHandbookItem, IShortHandbookItem} from "../types";
import {useTranslation} from "react-i18next";
import {useSearchParams} from "react-router-dom";
import {set} from "react-hook-form";
export const useTabTile = (title: string) => {
    useEffect(() => {
        document.title = title
    }, [title])
}

export const useForceUpdate = ():() => void => {
    const [d, setD] = useState<boolean>(false)
    return  () => setD(!d)
}

export function useAutoRef<T extends HTMLDivElement | HTMLInputElement> () {
    const ref = useRef<T>(null)
    const forceUpdate = useForceUpdate()
    useEffect(() => {
        forceUpdate()
    }, [ref.current])

    return ref
}

export const useBlurFocus = (hide: Function): { onFocus: FocusEventHandler, onBlur: FocusEventHandler} => {
    const timer = useRef<any>()

    const onFocus = () => {
        clearTimeout(timer.current)
    }

    const onBlur = () => {
        timer.current = setTimeout(() => hide())
    }

    return {onFocus, onBlur}
}


export const useOpenStatus = (defaultValue = false)
    : [state: boolean, setState: (value: boolean) => void, toggle: Function] => {
    const [state, setState] = useState(defaultValue)
    const toggle = () => setState(!state)
    return [state, setState, toggle]
}

type LanguageType = 'ru' | 'eng'

interface IUseMultiLanguageHandbooksOutput {
    currentLanguage: LanguageType
    getHandbookItemName: (item: IHandbookItem | IShortHandbookItem | null | undefined) => string
    getHandbookItemDescription: (item: IHandbookItem | null | undefined) => string | null
}
export const useMultiLanguageHandbooks = (): IUseMultiLanguageHandbooksOutput  => {
    const { i18n } = useTranslation()
    const currentLanguage = i18n.language as LanguageType
    const isRussian = currentLanguage === 'ru'
    const getHandbookItemName = (handbookItem: IHandbookItem | IShortHandbookItem | null | undefined) => {
        return handbookItem ? isRussian ? handbookItem.ru_name : handbookItem.eng_name || handbookItem.ru_name : ''
    }
    const getHandbookItemDescription = (handbookItem: IHandbookItem | null | undefined) => {
        return handbookItem ? isRussian ? handbookItem.ru_description : handbookItem.eng_description : ''
    }

    return {
        currentLanguage, getHandbookItemDescription, getHandbookItemName
    }
}

export function useClassState<T extends object>(defValue: T): [state: T, setState: (value: Partial<T>) => void] {
    const [state, setState] = useState(defValue)
    const setClassState = (value: Partial<T>) => setState({...state, ...value})

    return [state, setClassState]
}


interface IUseQueryParamsFormModeOutput<T> {
    editData: T
    setEditData: (data: Partial<T>) => void
    formMode: FormMode
    setEditMode: () => void
    setViewMode: () => void
    resetEditData: () => void
    edit: (callback: (data: T) => void) => void
}
export function useQueryParamsFormMode<T extends object>(initData: T): IUseQueryParamsFormModeOutput<T> {
    const [searchParams, setSearchParams] = useSearchParams()
    const formMode = (searchParams.get('mode') as FormMode) || 'view'


    const [editData, setData] = useState<T>(initData)
    const setEditData = (value: object) => {
        setData({
            ...editData,
            ...value
        })
    }
    const resetEditData = () => setData(initData)
    const setEditMode = () => setSearchParams({mode: 'edit'})
    const setViewMode = () => setSearchParams({})
    const edit = async (patch: (data: T) => void) => {
        if (formMode === 'edit') {
            if (Object.keys(editData).length > 1) {
                await patch(editData)
                resetEditData()
            }
            setViewMode()
        } else {
            setEditMode()
        }
    }
    return {editData, setEditData, formMode, setEditMode, setViewMode, resetEditData, edit}
}