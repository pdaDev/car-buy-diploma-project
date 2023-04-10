import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery, CommonGetListPayload, CommonServerListResult} from "../../../shared";
import * as NS from '../namespace'

export const reviewAPI = createApi({
    reducerPath: 'review',
    baseQuery: axiosBaseQuery({ baseUrl: 'reviews/'}),
    tagTypes: ['review'],
    endpoints:(build) => ({
        getReviewInfo: build.query({
            query:(arg) => ({
                url: '',
                method: 'GET'
            })
        }),
        getReview: build.query<NS.IReview, number>({
            query:(id) => ({
                url: `${id}/`,
                method: 'GET'
            })
        }),
        getReviews: build.query<CommonServerListResult<NS.IServerReviewListItem>, CommonGetListPayload & { generations: number[], models: number[], brends: [] }>({
            query:(params) => ({
                url: '',
                method: 'GET',
                params
            })
        }),
        editReview: build.mutation<void, NS.IReviewPatchPayload>({
            query:({id, ...body}) => ({
                url: `${id}/`,
                method: 'PATCH',
                body
            })
        }),
        createReview: build.mutation<NS.IReview, number>({
            query:(body) => ({
                url: ``,
                method: 'POST',
                body
            })
        })
    })
})

export const {
    useCreateReviewMutation,
    useEditReviewMutation,
    useGetReviewInfoQuery,
    useGetReviewsQuery,
    useGetReviewQuery,
} = reviewAPI