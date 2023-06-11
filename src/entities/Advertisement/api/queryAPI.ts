import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery, CommonGetListPayload} from "shared";
import * as NS from '../namespace'
import {getSearchGeoLocation} from "features/SelectGeoLocation/api";
import {getRecentAds} from "./historyAPI";

export const advertisementAPI = createApi({
    reducerPath: 'advertisement',
    tagTypes: ['advertisement', 'me-ads', 'history'],
    baseQuery: axiosBaseQuery({ baseUrl: 'advertisements/' }),
    endpoints: build => ({
        getAds: build.mutation<any, NS.GetAvertisemensPayload>({
            query: (body) => {
                const {limit, page, ...data} = body
                return {
                    method: 'POST',
                    params: {
                        limit,
                        offset: page
                    },
                    url: '',
                    privacy: 'all',
                    body: {
                        ...data,
                        location: getSearchGeoLocation().map(loc => loc.guid),
                    }
                }
            },
            transformResponse(response) {
                return response
            }
        }),
        getHistoryEls: build.mutation<any, void>({
            query: () => {
                return {
                    url: '',
                    privacy: 'all',
                    method: 'POST',
                    body: {
                        sort: null,
                        filters: null,
                        id: getRecentAds().map(ad => ad.id)
                    }
                }
            }
        }),
        getPreSearchData: build.query<NS.IPreSearchData, { generations: number[], models: number[], brends: number[] }>({
            query: ({generations, models, brends}) => {
                const generationsQuery = generations.map(gen => `generations=${gen}`).join('&')
                const brendsQuery = brends.map(brend => `brends=${brend}`).join('&')
                const modelsQuery = models.map(model => `models=${model}`).join('&')
                const carQuery = [modelsQuery, generationsQuery, brendsQuery].filter(str => str.length > 0).join('&')
                const locationQuery =  getSearchGeoLocation().map(loc => `location=${loc.guid}`).join('&')
                return {
                    url: `?${carQuery}&${locationQuery}`,
                    method: 'GET',
                }
            }
        }),
        getHistory: build.query<NS.IAdvertisementListItem[], any>({
            query: () => ({
                url: 'me/history/',
                privacy: 'authenticated',
                method: 'GET',
            }),
            providesTags: ['history']
        }),
        getRecommendations: build.query<NS.IAdvertisementListItem[], any>({
            query: () => ({
                url: 'me/recommendations/',
                privacy: 'authenticated',
                method: 'GET',
            })
        }),
        getFavouriteAds: build.query<any, CommonGetListPayload>({
            query: (data) => ({
                url: 'favourites/',
                privacy: 'authenticated',
                method: 'GET',
                params: data
            })
        }),
        getMyAds: build.query<NS.IAdvertisementListItemWithStatus[], void>({
            query: () => ({
                url: 'me/',
                privacy: 'authenticated',
                method: 'GET',
            }),
            providesTags: ['me-ads']
        }),
        deleteAd: build.mutation<void, number>({
            query: (id) =>({
                url: `me/${id}/`,
                privacy: 'authenticated',
                method: 'DELETE'
            }),
            invalidatesTags: ['me-ads']
        }),
        patchAd: build.mutation<void, { id: number, data: FormData }>({
            query: ({id, data}) => ({
                url: `me/${id}/`,
                privacy: 'authenticated',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['advertisement', 'me-ads']
        }),
        createAdvertisement: build.mutation<number, FormData>({
            query: (body) => ({
                url: `me/`,
                privacy: 'authenticated',
                method: 'POST',
                body
            }),
        }),
        getAdvertisement: build.query<NS.IServerAdvertisement, number | string>({
            query: (id) => `${id}/`,
            providesTags: ['advertisement'],
            // @ts-ignore
            invalidatesTags: ['history']
        })

    })
})

export const {
    useGetHistoryQuery,
    useCreateAdvertisementMutation,
    useGetRecommendationsQuery,
    useGetAdsMutation,
    useDeleteAdMutation,
    usePatchAdMutation,
    useGetFavouriteAdsQuery,
    useGetMyAdsQuery,
    useGetHistoryElsMutation,
    useGetPreSearchDataQuery,
    useGetAdvertisementQuery } = advertisementAPI