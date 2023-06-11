import {api, privateApi} from "shared";
import * as NS from '../namespace'

interface ILSOutcome<T extends object = any> {
    status: number
    data: T
}

interface ICompareListItem {
    id: number
    type: NS.CompareType
    compare_item_id: number
}




const COMPARE_LIST_KEY = 'compare_item'


function getAllCompareListLS(): ICompareListItem[] {
    const JSONList = localStorage.getItem(COMPARE_LIST_KEY)
    return JSONList ? JSON.parse(JSONList) : []
}

function saveCompareList(list: ICompareListItem[]) {
    localStorage.setItem(COMPARE_LIST_KEY, JSON.stringify(list))
}

function getCompareListIdsLS(): ILSOutcome {
    return {
        status: 200,
        data: {
            results: getAllCompareListLS()
        }
    }
}

function addToCompareLS(arg: NS.IServerCommonCompareItem): ILSOutcome {
    const compareList = getAllCompareListLS()
    if (compareList.filter(el => el.type === arg.type && el.compare_item_id === arg.id).length === 0)
        saveCompareList([...compareList,
            { id: compareList.length, type: arg.type, compare_item_id: arg.id }
        ])
    return {
        status: 200,
        data: {
            results: getAllCompareListLS()
        }
    }
}

function removeFromCompareLS(arg: NS.IServerCommonCompareItem): ILSOutcome {
    const compareList = getAllCompareListLS()
    console.log(arg, compareList)
    saveCompareList(compareList.filter(el => !(el.compare_item_id === arg.id && el.type === arg.type )))
    return {
        status: 200,
        data: {
            results: getAllCompareListLS()
        }
    }
}

export const getCompareListIds = (isAuthorized: boolean) => {
   return  isAuthorized
       ? privateApi.get('compare/ids/').then(data => data)
       : getCompareListIdsLS()
}

export const getCompareList = (isAuthorized: boolean, type: NS.CompareType, equipments?: string) => {
    if (isAuthorized) {
        const query = [`type=${type}`, type === "model" && equipments ? equipments : undefined].join('')
        return  privateApi.get(`compare/?${query}`).then(data => data)
    }
    const compareEls = getAllCompareListLS().filter(el => type === el.type)
    return api.post<NS.IServerCommonCompareItem[]>('compare/concrete/', {
            type,
            elements: compareEls}
        ).then(data => {
            if (data.data.length !== compareEls.length) {
                const currentCompareItems = data.data.map(el => el.id)
                saveCompareList(compareEls.filter(el => currentCompareItems.includes(el.id)))
            }
            return data
        })
}

export const addToCompare = (isAuthorized: boolean, arg: NS.IServerCommonCompareItem) => {
    return isAuthorized
        ? privateApi.post('compare/', arg)
        : addToCompareLS(arg)
}

export const removeFromCompare = (isAuthorized: boolean,  arg: NS.IServerCommonCompareItem) => {
    return isAuthorized
        ? privateApi.delete(`compare/${arg.id}/?type=${arg.type}`)
        : removeFromCompareLS(arg)
}

