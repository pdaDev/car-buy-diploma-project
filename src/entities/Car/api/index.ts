import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery} from "../../../shared";


export const carApi = createApi({
    reducerPath: 'car',
    baseQuery: axiosBaseQuery({baseUrl: 'car/'}),
    tagTypes: ['car', 'model', 'generation', 'brend'],
    endpoints: (build) => ({
        getCarInfo: build.query({
            query: id => `${id}/`
        })
    })
})

export const {
    useGetCarInfoQuery
} = carApi