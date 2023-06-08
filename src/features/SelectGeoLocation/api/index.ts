// ts-nocheck
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery} from "../../../shared";
import * as NS from '../namespace'
import {IServerGeoLocationItem, IServerResponse} from "../namespace";
import fetchJsonp from "fetch-jsonp";

export const getRussianRegions = async () => {

    return await fetchJsonp('https://kladr-api.ru/api.php?contentType=region&cityId=1',
        {  jsonpCallbackFunction: 'JSON_CALLBACK',   }).then((res) =>
        // @ts-ignore
        res.results.filter(reg => reg.id !== 'Free' && reg.contentType === 'region'))
}

export const getRussianCityByQuery = (query: string) => {
    return fetchJsonp(`https://kladr-api.ru/api.php?contentType=city&$query=${query}&withParent=1`,
        {  jsonpCallbackFunction: 'JSON_CALLBACK',   }).then(res =>
        // @ts-ignore
        res.results.filter(reg => reg.id !== 'Free' && reg.contentType === 'region'))
}



const LS_SEARCH_GEO_CODE = 'search_by_geo'
const LS_PERSONAL_GEO_CODE = 'personal_geo'

export const  setSearchGeoLocation  = (locations: IServerGeoLocationItem[]) => {
    localStorage.setItem(LS_SEARCH_GEO_CODE, JSON.stringify(locations))
}

export const clearSearchGeoLocation = () => {
    localStorage.removeItem(LS_SEARCH_GEO_CODE)
}

export const getSearchGeoLocation = (): IServerGeoLocationItem[] => {
    return localStorage.getItem(LS_SEARCH_GEO_CODE) ? JSON.parse(localStorage.getItem(LS_SEARCH_GEO_CODE)!) : []
}

export const setPersonalGeoLocation  = (location: IServerGeoLocationItem) => {
    localStorage.setItem(LS_PERSONAL_GEO_CODE, JSON.stringify(location))
}

export const clearPersonalGeoLocation = () => {
    localStorage.removeItem(LS_PERSONAL_GEO_CODE)
}

export const getPersonalGeoLocation = () => {
    return localStorage.getItem(LS_PERSONAL_GEO_CODE)
        ? JSON.parse(localStorage.getItem(LS_PERSONAL_GEO_CODE)!)
        : null
}