import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery, CommonGetListPayload} from "shared";
import * as NS from '../namespace'

export const advertisementAPI = createApi({
    reducerPath: 'advertisement',
    tagTypes: ['advertisement'],
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
                    body: data
                }
            },
            transformResponse(response) {
                return response
            }
        }),
        getFavouriteAds: build.query<any, CommonGetListPayload>({
            query: (data) => ({
                url: 'favourites/',
                privacy: 'authenticated',
                method: 'GET',
                params: data
            })
        }),
        getMyAds: build.query<any, CommonGetListPayload>({
            query: (data) => ({
                url: 'me/',
                privacy: 'authenticated',
                method: 'GET',
                params: data
            })
        }),
        deleteAd: build.mutation<void, number>({
            query: (id) =>({
                url: `me/${id}/`,
                privacy: 'authenticated',
                method: 'DELETE'
            })
        }),
        patchAd: build.mutation<void, NS.IAdvertisementPatchPayload>({
            query: ({id, ...body}) => ({
                url: `me/${id}/`,
                privacy: 'authenticated',
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['advertisement']
        }),
        getAdvertisement: build.query<NS.IServerAdvertisement, number | string>({
            query: (id) => `${id}/`,
            providesTags: ['advertisement']
        })

    })
})

export const { useGetAdsMutation, useDeleteAdMutation, usePatchAdMutation, useGetFavouriteAdsQuery, useGetMyAdsQuery, useGetAdvertisementQuery } = advertisementAPI