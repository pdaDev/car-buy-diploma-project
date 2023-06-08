import {DragEventHandler, FocusEventHandler, UIEventHandler, useEffect, useMemo, useRef, useState} from "react";
import {ExtendedSearchData, FormMode, ICarSearch, IHandbookItem, IOption, IShortHandbookItem} from "../types";
import {useTranslation} from "react-i18next";
import {useSearchParams} from "react-router-dom";
import {set, useForm, UseFormProps} from "react-hook-form";
import {debounce, getObjectKeys, isObject, setObjectFieldFromPath} from "./commonHelpers";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import {selectInitializedStatus, useAppNavigate, useAppSelector} from "../../app/services";
import {selectCurrentUser, selectUserId} from "../../entities/User/model/selectors";
import {number, object} from "prop-types";
import {query} from "firebase/firestore";
import {useAuthorize} from "../../entities/User/lib/hooks";

export const useTabTile = (title: string, loading: boolean = false) => {
    const { t } = useTranslation()
    useEffect(() => {
        if (loading)
            document.title = t('loading')
        else document.title = title
    }, [title, loading])
}

export const useForceUpdate = (): () => void => {
    const [d, setD] = useState<boolean>(false)
    return () => setD(!d)
}

type DefaultPermission = 'authorized' | 'admin' | 'activated'
export const useNavigationPermission = (defaultPermissions?: DefaultPermission[], permission?: boolean) => {
    const { id, isAdmin, isActive } = useAppSelector(selectCurrentUser)
    const isAuthed = id !== null
    const isInit = useAppSelector(selectInitializedStatus)
    const getPermissionByName = (p: DefaultPermission) => {
        switch (p) {
            case 'activated':
                return isActive
            case 'authorized':
                return isAuthed
            case 'admin':
                return isAdmin
            default:
                return true

        }
    }

    const defaultPermission = defaultPermissions ? defaultPermissions.every(getPermissionByName) : true
    const ownPermission = permission ?? true
    const hasPermission = defaultPermission && ownPermission
    const n = useAppNavigate()

    if (!hasPermission && isInit) {
        n(p => p.init)
    }
}

export function useAutoRef<T extends HTMLDivElement | HTMLInputElement>() {
    const ref = useRef<T>(null)
    const forceUpdate = useForceUpdate()
    useEffect(() => {
        forceUpdate()
    }, [ref.current])

    return ref
}

export const useBlurFocus = (hide: Function): { onFocus: FocusEventHandler, onBlur: FocusEventHandler } => {
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
    getHandbookOptions: (handbook: IHandbookItem[]) => IOption[]
}

export const useMultiLanguageHandbooks = (): IUseMultiLanguageHandbooksOutput => {
    const {i18n} = useTranslation()
    const currentLanguage = i18n.language as LanguageType
    const isRussian = currentLanguage === 'ru'
    const getHandbookItemName = (handbookItem: IHandbookItem | IShortHandbookItem | null | undefined) => {
        return handbookItem ? isRussian ? handbookItem.ru_name : handbookItem.eng_name || handbookItem.ru_name : ''
    }
    const getHandbookItemDescription = (handbookItem: IHandbookItem | null | undefined) => {
        return handbookItem ? isRussian ? handbookItem.ru_description : handbookItem.eng_description : ''
    }
    const getHandbookOptions = (handbook: IHandbookItem[]): IOption[] => {
        return handbook.map(h => ({
            label: isRussian ? h.ru_name : h.eng_name || h.ru_name,
            value: h.code
        }))
    }
    return {
        currentLanguage, getHandbookItemDescription, getHandbookItemName, getHandbookOptions
    }
}

export function useClassState<T extends object>(defValue: T): [state: T, setState: (value: Partial<T>) => void] {
    const [state, setState] = useState(defValue)
    const setClassState = (value: Partial<T>) => setState({...state, ...value})

    return [state, setClassState]
}


export function useQueryParamsFormMode<T extends object>(initData?: T) {
    const [searchParams, setSearchParams] = useSearchParams()
    const formMode = (searchParams.get('mode') as FormMode) || 'view'


    const [editData, setData] = useState<T | undefined>(initData)
    const setEditData = (value: object) => {
        if (initData) {
            setData({
                ...editData!,
                ...value
            })
        }
    }
    const resetEditData = () => setData(initData)
    const setCreateMode = () => setSearchParams({mode: 'create'})
    const setEditMode = () => setSearchParams({mode: 'edit'})
    const setViewMode = () => setSearchParams({})
    const isEditMode = formMode === 'edit'
    const setMode = (mode: FormMode) => {
        switch (mode) {
            case "create":
                setCreateMode()
                break
            case 'view':
                setViewMode()
                break
            case 'edit':
                setEditMode()
        }
    }
    const edit = async (patch: (data: T) => void) => {
        if (initData) {
            if (isEditMode) {
                if (Object.keys(editData!).length > 1) {
                    await patch(editData!)
                    resetEditData()
                }
                setViewMode()
            } else {
                setEditMode()
            }
        }
    }
    return {editData, setEditData, formMode, setEditMode, setViewMode, resetEditData, edit, isEditMode, setMode}
}

interface IOnScrollPaginationOutput {
    limit: number,
    offset: number
}


export const usePaginationAndSorting = (props?: { limit?: number, sort?: string }) => {
    const [page, setPage] = useState(0)
    const [skeletonLoading, setSkeletonLoading] = useState(true)
    const [limit, setLimit] = useState(10)
    const [sort, setSort] = useState<string | null>(null)

    const onSort = (sort: string | null) => {
        setSort(sort)
        setPage(0)
    }

    useEffect(() => {

    }, [page])

    useEffect(() => {
        if (props) {
            props.limit && setLimit(props.limit)
            props.sort && setSort(props.sort)
        }
    }, [props])

    useEffect(() => {
        setSkeletonLoading(true)
    }, [sort])

    const onPagination = (p: ((page: number) => number) | number) => {
        const currentPage = typeof p === 'function' ? p(page) : page
        if (currentPage === 0) {
            setSkeletonLoading(true)
        } else {
            setSkeletonLoading(false)
        }
        setPage(p)
    }
    return {page, setPage: onPagination, limit, setLimit, onSort, sort, skeletonLoading}
}

interface IUseOnScrollPaginationArgs<T> {
    data: T[] | undefined,
    loading: boolean,
    page: number
    onPagination: (page: number | ((p: number) => number)) => void
    sort: string | null
    limit: number
    count: number
}

export function useOnScrollPagination<T>({
                                             data,
                                             page,
                                             loading,
                                             onPagination,
                                             sort,
                                             limit,
                                             count
                                         }: IUseOnScrollPaginationArgs<T>) {

    const [elements, setElements] = useState<T[]>([])
    useEffect(() => {
        if (page === 0) {
            setElements([])
        }
    }, [page])

    useEffect(() => {
        setElements([])
        // console.log('bebra')
    }, [sort])


    useEffect(() => {
        if (data)
            setElements(els => [...els, ...data])
    }, [data])
    const maxPage = Math.ceil(count / limit) - 1

    const isMaxPage = page >= maxPage


    useEffect(() => {
        if (!isMaxPage) {
            const onScroll: UIEventHandler<HTMLBodyElement> = e => {
                if (!loading) {
                    // @ts-ignore
                    const el = e.target as HTMLDivElement
                    console.log('render')
                    console.log(el.scrollTop + el.clientHeight / 2 >= el.scrollHeight - el.clientHeight)

                    if (el.scrollTop + el.clientHeight / 2 >= 0.8 * el.scrollHeight
                        || el.scrollTop + el.clientHeight / 2 >= el.scrollHeight - el.clientHeight) {
                        console.log('bebre')
                        onPagination(p => p + 1)
                    }

                }
            }
            const debouncedScrollHandler = debounce(onScroll, 100)
            const el = document.getElementById('root')!
            el.addEventListener('scroll', debouncedScrollHandler as any)

            return () => {
                el.removeEventListener('scroll', debouncedScrollHandler)
            }
        }
    }, [loading, isMaxPage])

    const reset = () => setElements([])
    return {elements, reset}
}


type FormFiledErrors<T extends object> = Partial<Record<keyof T, { message?: string }>>

export function useMultiLanguageValidationErrors<T extends object>(error: FormFiledErrors<T>) {
    const {t} = useTranslation()
    return getObjectKeys(error).reduce<any>((acc, key) => {
        const errorMessage = error[key as keyof T] && error[key as keyof T]!.message
        const parsed = errorMessage ? errorMessage.split('=')  : []

        acc[key] = errorMessage
            ? t(`validators.${parsed[0]}`) + (parsed.length > 1 ? parsed[1] : '')
            : ''

        return acc
    }, {}) as Record<keyof T, string>
}

export const usePopup = (condition = true) => {
    useEffect(() => {
        const el = document.getElementById('root')!
        if (condition) {
            const paddingSize = window.innerWidth - document.body.clientWidth
            el.style.overflow = 'hidden'
            el.style.paddingRight = `${paddingSize}px`
            return () => {
                el.style.overflow = 'auto'
                el.style.paddingRight = `0px`
            }
        }
    }, [condition])
}


export const useInfinitePagination = (fetchData: (limit: number, count: number) => void, limit: number = 10, chunk: undefined | any[]) => {
    const [page, setPage] = useState<number>(0)

}

export const useFileDrop = () => {
    const [dragStatus, setDragStatus] = useState<boolean>(false)
    const [dragUnderBLock, setDragUnderBlockStatus] = useState(false)
    const timer = useRef<TimeoutId | undefined>(undefined)
    const onDragOver: DragEventHandler = e => {
        setDragUnderBlockStatus(true)
    }
    const onDragLeave: DragEventHandler = e => {
        setDragUnderBlockStatus(false)
    }

    const onDrop = (onImageChanges: (files: FileList) => void) => ((e) => {
        e.preventDefault()
        const files = e.dataTransfer?.files
        if (files) {
            onImageChanges(files)
        }
    }) as DragEventHandler

    useEffect(() => {
        const onDragLeave = (e: DragEvent) => {
            timer.current = setTimeout(() => setDragStatus(false), 10)
            e.preventDefault()

        }
        const onDragOver = (e: DragEvent) => {
            e.preventDefault()
            clearTimeout(timer.current)
            setDragStatus(true)
        }

        const onDrop = (e: DragEvent) => {
            e.preventDefault()
            setDragStatus(false)
        }
        document.addEventListener('dragover', onDragOver)
        document.addEventListener('dragleave', onDragLeave)
        document.addEventListener('drop', onDrop)

        return () => {
            document.removeEventListener('dragover', onDragOver)
            document.removeEventListener('dragleave', onDragLeave)
            document.removeEventListener('drop', onDrop)
        }
    }, [timer])

    return {dragStatus, dragUnderBLock, onDragLeave, onDragOver, onDrop}
}

export const useQuerySearchCar = () => {
    const [queryParams, setQueryParams] = useSearchParams()

    const setCarQuery = (car: ICarSearch) => {
        let query: string[] = []
        Object.keys(car).forEach(key => {
            const el = car[key as keyof ICarSearch]
            if (Array.isArray(el)) {
                query.push(el.map(item => `${key}*${item}`).join('%'))
            } else if (el !== null) {
                query.push(`${key}*${el}`)
            }
        })
        return query.join('%')
    }
    const onCarChange = (cars: ICarSearch[] | ICarSearch) => {
        let query = []
        if (Array.isArray(cars)) {
            query = cars.map(car => setCarQuery(car))
        } else {
            query[0] = setCarQuery(cars)
        }
        setQueryParams({'car': query})
    }
    const getCar = (query: string) => {
        const obj = {brend_id: null, model_id: [], generation_id: []} as ICarSearch
        query.split('%').forEach(q => {
            const [key, value] = q.split('*')
            if (Array.isArray(obj[key as keyof typeof obj])) {
                (obj[key as keyof ICarSearch] as number[]).push(+value)
            } else {
                // @ts-ignore
                obj[key as keyof typeof obj] = +value
            }
        })
        return obj
    }

    let cars = queryParams.getAll('car').map(car => getCar(car)) as ICarSearch[]
    cars = cars.length === 0 ? [{brend_id: null, model_id: [], generation_id: []} as ICarSearch] : cars
    return {onCarChange, cars, setCarQuery}

}


export function useQueryObject<T extends object>(defaultData: T, key: string) {

    const [searchQuery, setSearchQuery] = useSearchParams()
    const SEPARATOR = '|'
    const EQUAL = '%'
    const q = searchQuery.get(key)?.split(SEPARATOR).map(k => k.split(EQUAL)) || []

    const getObjectNestedLevevQuery = (object: object, startKey: string) => {

        let queries: string[] = []
        Object.keys(object).forEach(key => {
            const data = object[key as keyof object]

            const path = startKey ? `${startKey}__${key}` : key
            if (isObject(data)) {
                queries = [...queries, ...getObjectNestedLevevQuery(data, path)]
            } else if (Array.isArray(data)) {
                (data as any[]).forEach(el => queries.push(`${path}${EQUAL}${el}`))
            } else {
                queries.push(`${path}%${data}`)
            }
        })


        return queries
    }

    const getQuery = (object: object) => {
        return getObjectNestedLevevQuery(object, '').join(SEPARATOR)
    }

    const setQuery = (object: object) => {
        const query = getQuery(object)

        // @ts-ignore
        setSearchQuery([...[...searchQuery.entries()].filter(entry => entry[0] !== key), [key, query]])
    }

    const getParsedQuery = getQuery

    const gq = (object: object, startKey: string) => {
        const obj = {}
        Object.keys(object).forEach(key => {
            const data = object[key as keyof object]
            const path = startKey ? `${startKey}__${key}` : key

            if (isObject(data)) {
                // @ts-ignore
                obj[key] = gq(data, path)

            } else if (Array.isArray(data)) {
                const queryEls = q.filter(k => k[0] === path)
                // @ts-ignore
                obj[key] = queryEls.length > 0 ? queryEls.map(k => k[1]) : object[key]
            } else {

                const el = q.find(k => k[0] === path)

                // @ts-ignore
                obj[key] = el ? el[1].indexOf('null') === 0 ? null : el[1] : object[key]
            }
        })



        return obj
    }

    const query = gq(defaultData, '') as T

    return {
        getParsedQuery,
        setQuery,
        query
    }
}


export const useQuery = (defaultData?: object): [URLSearchParams, (o: object) => void] => {
    const [searchParams, setSearchParams] = useSearchParams()
    const partialSetQuery = (object: object) => {
        const entriesFromObject = Object.keys(object).map(key => [key, object[key as keyof object]])
        // @ts-ignore
        const entries = [...searchParams.entries()].filter(entry => !Object.keys(object).includes(entry[0]))
        const new_entries = [...entries, ...entriesFromObject]
        setSearchParams(new_entries)
    }
    // useEffect(() => {
    //     if (defaultData) {
    //         partialSetQuery(defaultData)
    //     }
    // }, [defaultData])


    return [searchParams, partialSetQuery]
}

