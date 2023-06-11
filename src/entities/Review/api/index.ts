import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery, CommonGetListPayload, CommonServerListResult, IServerReviewListItem} from "shared";
import * as NS from '../namespace'

export const reviewAPI = createApi({
    reducerPath: 'review',
    baseQuery: axiosBaseQuery({baseUrl: 'reviews/'}),
    tagTypes: ['review'],
    endpoints: (build) => ({
        getReviewInfo: build.query({
            query: (arg) => ({
                url: '',
                method: 'GET'
            })
        }),
        getMyReviews: build.query<IServerReviewListItem[], any>({
            query: ()  => 'me/'
        }),
        getReview: build.query<NS.IReview, number>({
            query: (id) => ({
                url: `${id}/`,
                method: 'GET',
            }),
            providesTags: ['review']
        }),
        getReviews: build.query<CommonServerListResult<IServerReviewListItem>, CommonGetListPayload & { generations: number[], models: number[], brends: number[] } & NS.IReviewSearchData>({
            query: ({generations, models, brends, ...params}) => {
                let carQuery = ''
                if (generations && brends && models) {
                    const generationsQuery = generations.map(gen => `generations=${gen}`).join('&')
                    const brendsQuery = brends.map(brend => `brends=${brend}`).join('&')
                    const modelsQuery = models.map(model => `models=${model}`).join('&')
                    carQuery = [modelsQuery, generationsQuery, brendsQuery].filter(str => str.length > 0).join('&')
                }


                return {
                    url: `?${carQuery}`,
                    method: 'GET',
                    params
                }
            }
        }),
        editReview: build.mutation<void, { id: number, data: FormData }>({
            query: ({id, data}) => ({
                url: `${id}/`,
                method: 'PATCH',
                body: data,
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            }),
            invalidatesTags: ['review']
        }),
        deleteReview: build.mutation<void, number>({
            query: (id) => ({
                url: `${id}/`,
                method: 'DELETE'
            })
        }),
        createReview: build.mutation<number, FormData>({
            query: (body) => ({
                url: ``,
                method: 'POST',
                body,
                privacy: 'authenticated',
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })
        })
    })
})

export const {
    useDeleteReviewMutation,
    useCreateReviewMutation,
    useEditReviewMutation,
    useGetMyReviewsQuery,
    useGetReviewInfoQuery,
    useGetReviewsQuery,
    useGetReviewQuery,
} = reviewAPI